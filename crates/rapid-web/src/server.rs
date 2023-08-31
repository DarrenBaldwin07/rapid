use super::{
	actix::{
		dev::{ServiceRequest, ServiceResponse},
		middleware::{Condition, NormalizePath},
		App, Error, HttpServer, Scope,
	},
	cors::Cors,
	default_routes::static_files,
	logger::RapidLogger,
	shift::generate::create_typescript_types,
	tui::server_init,
	util::{
		check_for_invalid_handlers, get_bindings_directory, get_routes_dir, get_server_port, should_generate_types, NEXTJS_ROUTE_PATH,
		REMIX_ROUTE_PATH,
		is_logging,
		is_serving_static_files
	},
};
use crate::{logger::init_logger, tui::rapid_chevrons};
use actix_http::{body::MessageBody, Request, Response};
use actix_service::{IntoServiceFactory, ServiceFactory};
use actix_web::dev::AppConfig;
use lazy_static::lazy_static;
use spinach::Spinach;
use rapid_cli::rapid_config::config::{find_rapid_config, RapidConfig};
use std::{env::current_dir, path::PathBuf, time::{self, Instant}, thread};
use colorful::{Color, Colorful};
extern crate proc_macro;


#[derive(Clone)]
pub struct RapidServer {
	pub port: Option<u16>,
	pub hostname: Option<String>,
}

// A lazily evaluated const variable for accessing the rapidConfig at runtime
lazy_static! {
	pub static ref RAPID_SERVER_CONFIG: RapidConfig = find_rapid_config();
}

/// A custom actix-web server implementation for the Rapid Framework
/// # Examples
/// ```
/// use rapid_web::server::RapidServer;
///
/// let app = RapidServer::create(None, None, None, None);
///
/// app.listen(HttpServer::new(move || {
///		RapidServer::router(None).route("/", web::get().to(route))
/// })).await
///
/// ```
impl RapidServer {
	pub fn create(port: Option<u16>, hostname: Option<String>) -> Self {
		Self { port, hostname }
	}

	/// A stock re-export of the actix-web "App::new()" router with a few extras
	/// This router does not support type-safe file based routing
	/// Note: to experience the full capabilities of rapid-web, we recommend using the RapidServer::fs_router function
	pub fn router(
		cors: Option<Cors>,
		log_type: Option<RapidLogger>,
	) -> App<impl ServiceFactory<ServiceRequest, Response = ServiceResponse<impl MessageBody>, Config = (), InitError = (), Error = Error>> {

		// First we need to go to the rapid config file and check for the is_logging variable
		let is_logging = is_logging();

		// Check if we should also be serving static files
		let is_serving_static_files = is_serving_static_files();

		let config_logging_server = {
			if is_logging {
				match log_type {
					Some(logging_type) => App::new()
						.wrap(cors.unwrap_or(Cors::default()))
						.wrap(Condition::new(true, logging_type))
						.wrap(NormalizePath::trim()),
					None => App::new()
						.wrap(cors.unwrap_or(Cors::default()))
						.wrap(Condition::new(true, RapidLogger::minimal()))
						.wrap(NormalizePath::trim()),
				}
			} else {
				App::new()
					.wrap(cors.unwrap_or(Cors::default()))
					.wrap(Condition::new(false, RapidLogger::minimal()))
					.wrap(NormalizePath::trim())
			}
		};

		// Depending on what is inside of the config file lets attempt to serve static files..
		match is_serving_static_files {
			true => config_logging_server.service(static_files::static_files()),
			false => config_logging_server,
		}
	}

	/// A file-system based router for rapid-web
	///
	/// Build your api with a simple file based technique (ex: _middleware.rs, index.rs)
	///
	/// * `routes` - A string slice that holds the path to the file system routes root directory (ex: "src/routes") -- this value can be anything as long as it is a valid (relative) directory path
	/// * `cors` - An optional cors value that can be used to configure the cors middleware
	/// * `log_type` - An optional logger type that can be used to configure the logger middleware used for every request/response
	///
	/// > Docs coming soon...
	pub fn fs_router(
		cors: Option<Cors>,
		log_type: Option<RapidLogger>,
		routes: Scope,
	) -> App<impl ServiceFactory<ServiceRequest, Response = ServiceResponse<impl MessageBody>, Config = (), InitError = (), Error = Error>> {
		// Initialize our router with the config options the user passed in
		RapidServer::router(cors, log_type).service(routes)
	}

	/// Takes in a pre-configured HttpServer and listens on the specified port(s)
	///
	/// # Notes
	/// This function will try to initalize a logger in case one has not already been initalized.
	/// If you would like to use your own logger, make sure it has been initalized before this
	/// function is called
	pub async fn listen<F, I, S, B>(self, server: HttpServer<F, I, S, B>) -> std::io::Result<()>
	where
		F: Fn() -> I + Send + Clone + 'static,
		I: IntoServiceFactory<S, Request>,
		S: ServiceFactory<Request, Config = AppConfig> + 'static,
		S::Error: Into<Error>,
		S::InitError: std::fmt::Debug,
		S::Response: Into<Response<B>>,
		B: MessageBody + 'static,
	{
		// Initialize the env_logger for rapid server logs
		init_logger();

		// Grab the users configured server binding values from either the RapidServer object
		// or the actualy rapid config file in the project root
		let bind_config = get_default_bind_config(RAPID_SERVER_CONFIG.clone(), self.hostname, self.port);

		// Grab the routes directory from the rapid config file (this powers how we export types)
		// Note: make sure we panic if we are not able to detect it
		let routes_dir = match RAPID_SERVER_CONFIG.app_type.as_str() {
			"server" => get_routes_dir(RAPID_SERVER_CONFIG.server.as_ref()),
			"remix" => REMIX_ROUTE_PATH.to_owned(),
			_ => NEXTJS_ROUTE_PATH.to_owned(),
		};

		// Grab the bindings directory from the rapid config file
		// We want to make sure that it is valid and is actually defined (it defaults to an Option<String>)
		// TODO: this needs refactored (or abstracted) really bad -- we need to have the match statements if we want better panic messages
		let bindings_out_dir = get_bindings_directory();

		// Check if we should generate typescript types or not
		let should_generate_typescript_types = should_generate_types(RAPID_SERVER_CONFIG.clone());

		// Show the server initialization message
		server_init(bind_config.clone());

		// Only trigger type generation if the users configured options in their rapid config file permits it
		// (we also dont want to generate types in a production environment)
		if should_generate_typescript_types && cfg!(debug_assertions) {
			generate_typescript_types(bindings_out_dir, routes_dir.clone(), RAPID_SERVER_CONFIG.clone());
		}

		// Check for any invalid routes and log them to the console
		check_for_invalid_handlers(&routes_dir);

		// Finally, bind and run the rapid server
		server.bind(bind_config)?.run().await
	}
}

/// Generate the default server bind config based on the rapid config file
fn get_default_bind_config(config: RapidConfig, host_name: Option<String>, port: Option<u16>) -> (String, u16) {
	// Get the hostname from the server object initialized by the consumer
	// We need to check if they passed one in -- if they didn't, we'll use localhost
	let server_hostname = match host_name {
		Some(value) => value,
		None => String::from("localhost"),
	};

	// Grab a fallback port if the user did not specify one inside of the root rapid config file
	let fallback_port = match port {
		Some(value) => value,
		None => 8080,
	};

	// Grab the port from either the server config or the rapid config file
	let port = get_server_port(config, fallback_port);

	(server_hostname, port)
}

pub fn generate_typescript_types(bindings_out_dir: PathBuf, routes_dir: String, config: RapidConfig) {
	// Check if we should be converting types inside of every directory
	let every_dir_types_gen = match config.app_type.as_str() {
		"server" => match config.server {
			Some(server) => match server.typescript_generation_directory {
				Some(value) => value,
				None => "".to_string(),
			},
			None => "".to_string(),
		},
		"remix" => match config.remix {
			Some(remix) => match remix.typescript_generation_directory {
				Some(value) => value,
				None => "".to_string(),
			},
			None => "".to_string(),
		},
		_ => match config.nextjs {
			Some(nextjs) => match nextjs.typescript_generation_directory {
				Some(value) => value,
				None => "".to_string(),
			},
			None => "".to_string(),
		},
	};

	let routes_directory = current_dir()
		.expect("Could not parse routes direcory path found in rapid config file.")
		.join(PathBuf::from(routes_dir.clone()));

	// Generate our type gen dir
	let type_generation_directory = if every_dir_types_gen != "" {
		current_dir()
			.expect("Could not parse current directory while executing type generation!")
			.join(every_dir_types_gen)
	} else {
		// If the typegen directory was not defined by the user, simply fallback to only doing handler types in the routes directorys
		routes_directory.clone()
	};

	let start_time = Instant::now();
	// Show a loading spinner as needed
	let loading = Spinach::new(format!("{} Generating types...", rapid_chevrons()));
	// TODO: Support output types with this function
	create_typescript_types(bindings_out_dir, routes_directory, type_generation_directory);

	// Sleep a little to show loading animation
	let timeout = time::Duration::from_millis(550);
	thread::sleep(timeout);

	loading.succeed(format!("Generated typescript types in {} ms\n", start_time.elapsed().as_millis().to_string().color(Color::Blue).bold()));
}

#[cfg(test)]
mod tests {
	use super::*;
	use actix_web::web;

	async fn test_server_and_router() {

	}
}
