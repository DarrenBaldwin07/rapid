use super::{
	actix::{
		dev::{ServiceRequest, ServiceResponse},
		App, Error, HttpServer,
		middleware::NormalizePath
	},
	cors::Cors,
	logger::{RapidLogger, init_logger},
	tui::{server_init},
};
use actix_http::{body::MessageBody, Request, Response};
use actix_service::{IntoServiceFactory, ServiceFactory};
use actix_web::dev::AppConfig;
use rapid_cli::rapid_config::config::{find_rapid_config, RapidConfig};


#[derive(Clone)]
pub struct RapidServer {
	pub port: Option<u16>,
	pub is_logging: Option<bool>,
	pub base_route: Option<String>,
	pub hostname: Option<String>,
}

/// A custom actix-web server implementation for the Rapid Framework
/// # Examples
/// ```
///
/// let app = RapidServer::create(None, None, None, None);
///
/// app.listen(HttpServer::new(move || {
///		RapidServer::router(None).route("/", web::get().to(route))
/// })).await
///
/// ```
impl RapidServer {
	pub fn create(port: Option<u16>, is_logging: Option<bool>, base_route: Option<String>, hostname: Option<String>) -> Self {
		Self {
			port,
			is_logging,
			base_route,
			hostname,
		}
	}

	pub fn router(
		cors: Option<Cors>,
	) -> App<impl ServiceFactory<ServiceRequest, Response = ServiceResponse<impl MessageBody>, Config = (), InitError = (), Error = Error>> {
		// We can declare our customing logging and error pages here:
		App::new()
			.wrap(RapidLogger)
			.wrap(cors.unwrap_or(Cors::default()))
			.wrap(NormalizePath::trim())
	}

    /// Takes in a pre-configured HttpServer and listens on the specified port(s)
	pub async fn listen<
		F,
		I,
		S,
		B
	>(
        self,
		server: HttpServer<F, I, S, B>,
	) -> std::io::Result<()> where
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

		// Grab the rapid config file inside of the project root
		let rapid_server_config = find_rapid_config();

		// Grab the users configured server binding values from either the RapidServer object
		// or the actualy rapid config file in the project root
		let bind_config = get_default_bind_config(rapid_server_config, self.hostname, self.port);

		// Show the init message
		server_init(bind_config.clone());

        server.bind(bind_config)?
        .run()
        .await
	}
}

fn get_default_bind_config(config: RapidConfig, host_name: Option<String>, port: Option<u16>) -> (String, u16) {
	// Get the hostname from the server object initialized by the consumer
	// We need to check if they passed one in
	let server_hostname = match host_name {
		Some(value) => value,
		None => String::from("localhost")
	};

	// Grab a fallback port if the user did not specify one inside of the root rapid config file
	let fallback_port = match port {
		Some(value) => value,
		None => 8080
	};

	// Grab the port from either the server config or the rapid config file
	let port = match config.server {
		Some(value) => match value.port {
			Some(port) => port,
			None => fallback_port
		},
		None => fallback_port
	};

    (server_hostname, port)
}
