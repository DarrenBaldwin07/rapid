use super::tui::rapid_log_target;
use std::future::{ready, Ready};
use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    Error
};
use futures_util::future::LocalBoxFuture;
use log::info;
use std::env;
use std::io::Write;
use colorful::{Color, Colorful};

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

// Function that takes in a ServiceRequest and creates a formatted log to the console via the env_logger crate
fn format_logs(req: &ServiceRequest) -> String  {
    let request_method = req.method().to_string().color(Color::LightBlue);
    let request_path = req.path();
    let request_http = req.version();

    format!("{} {} {} {} {:?}", rapid_log_target(), "request", request_method, request_path, request_http)
}

fn request_logs(req: &ServiceRequest) {
    info!("{}", format_logs(req));
}

fn response_logs<B>(res: &ServiceResponse<B>) {
    let response_status = res.status().to_string().color(Color::LightCyan);

    info!("{} {} {}", rapid_log_target(), "response", response_status);
}

#[derive(Copy, Clone)]
enum LoggerType {
    Minimal,
    Detailed,
    Verbose,
}

pub struct RapidLogger {
    logger_type: LoggerType,
}

impl RapidLogger {
    pub fn minimal() -> Self {
        Self {
            logger_type: LoggerType::Minimal,
        }
    }

    pub fn detailed() -> Self {
        Self {
            logger_type: LoggerType::Detailed,
        }
    }

    pub fn verbose() -> Self {
        Self {
            logger_type: LoggerType::Verbose,
        }
    }
}

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
        ready(Ok(RapidLoggerMiddleware { service, log_type: self.logger_type }))
    }
}

pub struct RapidLoggerMiddleware<S> {
    service: S,
    log_type: LoggerType
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
        // We want spacing between each log
        println!("\n");
        request_logs(&req);
        let fut = self.service.call(req);

        Box::pin(async move {
            let res = fut.await?;
            response_logs(&res);
            Ok(res)
        })
    }
}

