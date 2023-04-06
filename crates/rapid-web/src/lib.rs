pub use actix_cors as cors;
pub use actix_files as files;
pub use actix_web as actix;
pub use actix_web_httpauth as auth;
pub use rapid_web_codegen;
pub use default_routes::templates::WELCOME_TEMPLATE as welcome_view;
pub mod logger;
pub mod server;
pub mod shift;
pub(crate) mod default_routes;
pub(crate) mod tui;
pub(crate) mod util;

// Create new namings for every actix extractor (this is so that Shift can easily parse new route files and generate the correct typescript types)
pub mod request {
    pub use actix_web::web::Json as RapidJson;
    pub use actix_web::web::Path as RapidPath;
    pub use actix_web::web::Query as RapidQuery;
}
