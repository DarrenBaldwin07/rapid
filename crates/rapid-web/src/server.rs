use super::actix::{web, App, HttpServer};
use super::cors::Cors;

pub struct RapidServer<T> {
    pub port: Option<u16>,
    pub is_logging: Option<bool>,
    pub app_state: Option<T>,
    pub cors: Option<Cors>
}

impl<T> RapidServer<T> {
    fn create(port: Option<u16>, is_logging: Option<bool>, app_state: Option<T>, cors: Option<Cors>) -> Self {
        Self {
            port,
            is_logging,
            app_state,
            cors
        }
    }

    fn listen() {

    }
}
