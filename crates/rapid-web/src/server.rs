use super::{
	actix::{
		dev::{ServiceRequest, ServiceResponse},
		App, Error, HttpServer,
	},
	cors::Cors,
};
use actix_http::{body::MessageBody, Request, Response};
use actix_service::{IntoServiceFactory, ServiceFactory};
use actix_web::dev::AppConfig;

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
/// let app = RapidServer.create();
/// let router = app.router();
/// app.listen();
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
		&self,
		cors: Option<Cors>,
	) -> App<impl ServiceFactory<ServiceRequest, Response = ServiceResponse<impl MessageBody>, Config = (), InitError = (), Error = Error>> {
		// We can declare our customing logging and error pages here:
		App::new().wrap(cors.unwrap())
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
        server.bind((self.hostname.unwrap(), self.port.unwrap()))?
        .run()
        .await
	}
}

fn get_default_bind_config() -> (String, u32) {
    (String::from("localhost"), 8080)
}
