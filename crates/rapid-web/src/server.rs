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
	tui::server_init
};
use actix_http::{body::MessageBody, Request, Response};
use actix_service::{IntoServiceFactory, ServiceFactory};
use actix_web::dev::AppConfig;
use lazy_static::lazy_static;
use rapid_cli::rapid_config::config::{find_rapid_config, RapidConfig};
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
	/// This router does not support typesafey file based routing
	/// Note: to experience the full capabilities of rapid-web, use the RapidServer::fs_router function
	pub fn router(
		cors: Option<Cors>,
		log_type: Option<RapidLogger>,
	) -> App<impl ServiceFactory<ServiceRequest, Response = ServiceResponse<impl MessageBody>, Config = (), InitError = (), Error = Error>> {
		// First we need to go to the rapid config file and check for the is_logging variable
		let is_logging = match RAPID_SERVER_CONFIG.server.as_ref() {
			Some(value) => match value.is_logging {
				Some(log_value) => log_value,
				None => true,
			},
			None => true,
		};
		// Check if we should also be serving static files
		let is_serving_static_files = match RAPID_SERVER_CONFIG.server.as_ref() {
			Some(value) => match value.serve_static_files {
				Some(static_value) => static_value,
				None => true,
			},
			None => true,
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
	/// * `cors` - An optional cors middleware that can be used to configure the cors middleware
	/// * `log_type` - An optional logger middleware that can be used to configure the logger middleware
	pub fn fs_router(
		cors: Option<Cors>,
		log_type: Option<RapidLogger>,
		routes: Scope,
	) -> App<impl ServiceFactory<ServiceRequest, Response = ServiceResponse<impl MessageBody>, Config = (), InitError = (), Error = Error>> {
		// Grab the routes directory from the rapid config file (this powers how we export types)
		// Note: make sure we panic if we are not able to detect it
		let routes_dir = match RAPID_SERVER_CONFIG.server.as_ref() {
			Some(server) => match server.routes_directory.clone() {
				Some(dir) => match dir == "/" {
					true => panic!("The 'routes_directory' variable cannot be set to a base path. Please use something nested!"),
					false => dir,
				},
				None => panic!("Error: the 'routes_directory' variable must be set in your rapid config file!"),
			},
			None => panic!("You must have a valid rapid config file in the base project directory!"),
		};

		// Grab the bindings directory from the rapid config file
		// We want to make sure that it is valid and is actually defined (it defaults to an Option<String>)
		let bindings_out_dir = match RAPID_SERVER_CONFIG.server.as_ref() {
			Some(server) => match server.bindings_export_path.clone() {
				Some(dir) => match dir == "/" {
					true => current_dir().unwrap(),
					false => PathBuf::from(dir),
				},
				None => panic!("Error: the 'bindings_export_path' variable must be set in your rapid config file!"),
			},
			None => panic!("You must have a valid rapid config file in the base project directory!"),
		};

		// TODO: we should turn this off until it is officially working
		create_typescript_types(bindings_out_dir, current_dir().unwrap().join(PathBuf::from(routes_dir)));

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

		// Show the server initialization message
		server_init(bind_config.clone());

		server.bind(bind_config)?.run().await
	}
}

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
	let port = match config.server {
		Some(value) => match value.port {
			Some(port) => port,
			None => fallback_port,
		},
		None => fallback_port,
	};

	(server_hostname, port)
}
