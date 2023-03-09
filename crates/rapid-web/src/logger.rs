use std::future::{ready, Ready};
use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    Error,
};
use futures_util::future::LocalBoxFuture;
use log::info;
use std::env;
use std::io::Write;


pub fn init_logger() {

    // Configure our logger
    env::set_var("RUST_LOG", "info");

    env_logger::builder()
    .format(|buf, record| {
        // All the targets that actix-web logs from by default
        const TARGETS: [&'static str; 4] = ["actix_server::builder", "actix_server::server", "actix_server::worker", "actix_server::accept"];
        // We want to hide the actix web default logs
        // Check for a specific target from actix and write nothing to the console instead
        if TARGETS.contains(&record.metadata().target()) {
            return write!(buf, "");
        }
        writeln!(buf, "{}: {}", record.level(), record.args())
    })
    .init();
}

// Function that takes in a ServiceRequest and creates a formatted
fn format_logs() {

}

pub struct RapidLogger;

impl<S, B> Transform<S, ServiceRequest> for RapidLogger
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = RapidLoggerMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(RapidLoggerMiddleware { service }))
    }
}

pub struct RapidLoggerMiddleware<S> {
    service: S,
}

impl<S, B> Service<ServiceRequest> for RapidLoggerMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        info!("{:?}", req);
        println!("Hi from start. You requested: {}", req.path());
        let fut = self.service.call(req);

        Box::pin(async move {
            let res = fut.await?;

            Ok(res)
        })
    }
}

