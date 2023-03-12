use super::tui::rapid_log_target;
use std::future::{ready, Ready};
use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    Error,
    http::header::HeaderValue,
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

    fn minimal_request_logs(req: &ServiceRequest)  {
        let request_method = req.method().to_string().color(Color::LightBlue);
        let request_path = req.path();
        let request_http = req.version();

        let logs = format!("{} {} {} {} {:?}", rapid_log_target(), "request", request_method, request_path, request_http);
        info!("{}", logs);
    }


    fn minimal_response_logs<B>(res: &ServiceResponse<B>) {
        let response_status = res.status().to_string().color(Color::LightCyan);

        info!("{} {} {}", rapid_log_target(), "response", response_status);
    }

    fn detailed_request_logs(req: &ServiceRequest) {
        let request_method = req.method().to_string().color(Color::LightBlue);
        let request_path = req.path();
        let request_http = req.version();
        let request_headers = req.headers().keys().map(|key| (key.to_string(), req.headers().get(key.to_string()).unwrap())).collect::<Vec<(String, &HeaderValue)>>();
        let is_secure = req.app_config().secure();
        let agent = match req.headers().get("user-agent") {
            Some(agent) => agent.to_str().unwrap(),
            None => "Not Found",
        };

        let logs = format!("{} {} {} {} {:?} {} {} {}", rapid_log_target(), "request", request_method, request_path, request_http, format!("{}{:?}", "headers=".color(Color::LightBlue), request_headers), format!("{}{}", "is_secure=".color(Color::LightBlue), is_secure), format!("{}{}", "agent=".color(Color::LightBlue), agent));
        info!("{}", logs);
    }

    fn detailed_response_logs<B>(res: &ServiceResponse<B>) {
        let response_status = res.status().to_string().color(Color::LightCyan);
        let response_headers = {
            let headers = res.headers().keys().map(|key| (key.to_string(), res.headers().get(key.to_string()).unwrap())).collect::<Vec<(String, &HeaderValue)>>();

            if headers.len() == 0 {
                "No Headers".to_string()
            } else {
                headers.iter().map(|(key, value)| format!("{}: {}", key, value.to_str().unwrap())).collect::<Vec<String>>().join(", ")
            }
        };

        let logs = format!("{} {} {} {:?}", rapid_log_target(), "response", response_status, response_headers);
        info!("{}", logs);

    }

    fn verbose_request_logs(req: &ServiceRequest) {
        let is_secure = req.app_config().secure();
        info!("{} {:?} is_secure={}", rapid_log_target(), req.request(), is_secure);
    }

    fn verbose_response_logs<B>(res: &ServiceResponse<B>) {
        let response_status = res.status().to_string().color(Color::LightCyan);
        let response_headers = res.headers();


        info!("{}", rapid_log_target());
    }

    fn get_request_logs(req: &ServiceRequest, logger_type: LoggerType) {
        match logger_type {
            LoggerType::Minimal => Self::minimal_request_logs(req),
            LoggerType::Detailed => Self::detailed_request_logs(req),
            LoggerType::Verbose => Self::verbose_request_logs(req),
        }
    }

    fn get_response_logs<B>(res: &ServiceResponse<B>, logger_type: LoggerType) {
        match logger_type {
            LoggerType::Minimal => Self::minimal_response_logs(res),
            LoggerType::Detailed => Self::detailed_response_logs(res),
            LoggerType::Verbose => Self::verbose_response_logs(res),
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
        let cloned_log_type = self.log_type.clone();

        // We want spacing between each log
        println!("\n");
        RapidLogger::get_request_logs(&req, cloned_log_type);
        let fut = self.service.call(req);

        Box::pin(async move {
            let res = fut.await?;
            RapidLogger::get_response_logs(&res, cloned_log_type);
            Ok(res)
        })
    }
}

