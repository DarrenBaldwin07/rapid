use std::{env::current_dir, path::PathBuf};
use super::{
	actix::{
		dev::{ServiceRequest, ServiceResponse},
		middleware::{Condition, NormalizePath},
		App, Error, HttpServer, Scope,
	},
	cors::Cors,
	default_routes::static_files,
	logger::{init_logger, RapidLogger},
	shift::generate::create_typescript_types,
	tui::{clean_console, server_init},
	util::{check_for_invalid_handlers, get_routes_dir, get_server_port, should_generate_types},
};
use actix_http::{body::MessageBody, Request, Response};
use actix_service::{IntoServiceFactory, ServiceFactory};
use actix_web::dev::AppConfig;
use lazy_static::lazy_static;
use rapid_cli::{
	cli::rapid_logo,
	rapid_config::config::{find_rapid_config, RapidConfig},
};
use spinach::Spinach;
use std::{thread, time};
extern crate proc_macro;

#[derive(Clone)]
pub struct RapidServer {
	pub port: Option<u16>,
	pub hostname: Option<String>,
}

// A lazily evaluated const variable for accessing the rapidConfig at runtime
lazy_static! {
	static ref RAPID_SERVER_CONFIG: RapidConfig = find_rapid_config();
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
	/// Note: to experience the full capabilities of rapid-web, we recommend useing the RapidServer::fs_router function
	pub fn router(
		cors: Option<Cors>,
		log_type: Option<RapidLogger>,
	) -> App<impl ServiceFactory<ServiceRequest, Response = ServiceResponse<impl MessageBody>, Config = (), InitError = (), Error = Error>> {
		// First we need to detect our app type
		let app_type = &RAPID_SERVER_CONFIG.app_type;



		// Next we need to go to the rapid config file and check for the is_logging variable
		let is_logging = match app_type.as_str() {
			"server" => match RAPID_SERVER_CONFIG.server.as_ref() {
				Some(value) => match value.is_logging {
					Some(log_value) => log_value,
					None => true,
				},
				None => true,
			},
			"remix" => match RAPID_SERVER_CONFIG.remix.as_ref() {
				Some(value) => match value.is_logging {
					Some(log_value) => log_value,
					None => true,
				},
				None => true,
			}
			_ => panic!("Error: invalid config type found in rapid config file. Please use either `server` or `remix`")
		};

		// Check if we should also be serving static files
		let is_serving_static_files = match app_type.as_str() {
			"server" => match RAPID_SERVER_CONFIG.server.as_ref() {
				Some(value) => match value.serve_static_files {
					Some(static_value) => static_value,
					None => true,
				},
				None => true,
			},
			"remix" => match RAPID_SERVER_CONFIG.remix.as_ref() {
				Some(value) => match value.serve_static_files {
					Some(static_value) => static_value,
					None => true,
				},
				None => true,
			}
			_ => panic!("Error: invalid config type found in rapid config file. Please use either `server` or `remix`")
		};

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
	pub fn fs_router(
		cors: Option<Cors>,
		log_type: Option<RapidLogger>,
		routes: Scope,
	) -> App<impl ServiceFactory<ServiceRequest, Response = ServiceResponse<impl MessageBody>, Config = (), InitError = (), Error = Error>> {
		// Initialize our router with the config options the user passed in
		RapidServer::router(cors, log_type).service(routes)
	}

	/// Takes in a pre-configured HttpServer and listens on the specified port(s)
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
			"remix" => String::from("app/api/routes"),
			_ => panic!("Error: the 'routes_directory' variable must be set in your rapid config file!")
		};

		// Grab the bindings directory from the rapid config file
		// We want to make sure that it is valid and is actually defined (it defaults to an Option<String>)
		// TODO: this needs refactored (or abstracted) really bad
		let bindings_out_dir = match RAPID_SERVER_CONFIG.app_type.as_str() {
			"server" => match RAPID_SERVER_CONFIG.server.as_ref() {
				Some(server) => match server.bindings_export_path.clone() {
					Some(dir) => match dir == "/" {
						true => current_dir().expect("Could not parse bindings export path found in rapid config file."),
						false => current_dir()
							.expect("Could not parse bindings export path found in rapid config file.")
							.join(PathBuf::from(dir)),
					},
					None => panic!("Error: the 'bindings_export_path' variable must be set in your rapid config file!"),
				},
				None => panic!("You must have a valid rapid config file in the base project directory!"),
			},
			"remix" => match RAPID_SERVER_CONFIG.remix.as_ref() {
				Some(remix) => match remix.bindings_export_path.clone() {
					Some(dir) => match dir == "/" {
						true => current_dir().expect("Could not parse bindings export path found in rapid config file."),
						false => current_dir()
							.expect("Could not parse bindings export path found in rapid config file.")
							.join(PathBuf::from(dir)),
					},
					None => panic!("Error: the 'bindings_export_path' variable must be set in your rapid config file!"),
				},
				None => panic!("You must have a valid rapid config file in the base project directory!"),
			},
			_ => panic!("Error: the 'routes_directory' variable must be set in your rapid config file!")
		};

		// Check if we should generate typescript types or not
		let should_generate_typescript_types = should_generate_types(RAPID_SERVER_CONFIG.clone());

		// Only trigger type generation if the users configured options in their rapid config file permits it (we also dont want to generate types in a production environment)
		if should_generate_typescript_types && cfg!(debug_assertions) {
			generate_typescript_types(bindings_out_dir, routes_dir.clone());
		}

		// Show the server initialization message
		server_init(bind_config.clone());

		// Check for any invalid routes and log them to the console
		check_for_invalid_handlers(&routes_dir);

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

pub fn generate_typescript_types(bindings_out_dir: PathBuf, routes_dir: String) {
	// Clean the console before proceeding...
	clean_console();

	// Show a loading spinner as needed
	let loading = Spinach::new(format!("{} Generating types...", rapid_logo()));

	// TODO: we should turn this off until it is officially working (also, we should make this optional)
	create_typescript_types(
		bindings_out_dir,
		current_dir()
			.expect("Could not parse bindings export path found in rapid config file.")
			.join(PathBuf::from(routes_dir.clone())),
	);

	// Sleep a little to show loading animation
	let timeout = time::Duration::from_millis(650);
	thread::sleep(timeout);

	// Stop the loading animation
	loading.stop();
}
