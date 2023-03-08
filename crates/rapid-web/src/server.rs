use super::actix::{App, HttpServer, web::ServiceConfig};
use super::cors::Cors;

#[derive(Clone)]
pub struct RapidCors<'a> {
    allowed_origin: &'a str,
    allowed_methods: Vec<&'a str>,
    allowed_headers: Vec<&'a str>,
    expose_headers: Vec<&'a str>,
    max_age: Option<usize>,
    preflight: bool,
    send_wildcard: bool,
    supports_credentials: bool,
    vary_header: bool,
    block_on_origin_mismatch: bool,
}

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
/// app.listen();
/// ```
impl RapidServer {
    pub fn create(port: Option<u16>, is_logging: Option<bool>, base_route: Option<String>, hostname: Option<String>) -> Self {
        Self {
            port,
            is_logging,
            base_route,
            hostname
        }
    }

    pub async fn listen(&self, router: fn(&mut ServiceConfig), cors: Option<RapidCors<'static>>) -> std::io::Result<()> {
        HttpServer::new(move || {
            let rapid_cors = Cors::default()
                .allowed_origin(cors.clone().unwrap().allowed_origin)
                .max_age(cors.clone().unwrap().max_age)
                .allowed_methods(cors.clone().unwrap().allowed_methods);


            App::new()
            .wrap(rapid_cors)
            .configure(router)
        })
        .bind(("", self.port.unwrap()))?
		.run()
		.await
    }
}

