pub use actix_cors as cors;
pub use actix_files as files;
pub use actix_web as actix;
pub use actix_web_httpauth as auth;
pub use default_routes::templates::WELCOME_TEMPLATE as welcome_view;
pub use rapid_web_codegen;
pub(crate) mod default_routes;
pub mod logger;
pub mod server;
pub mod types;
pub(crate) mod shift; // TODO: shift needs to be abstracted out into its own crate (for now it will be left private to rapid-web as users do not need to access it)
pub(crate) mod tui;
pub(crate) mod util;

// Create new namings for every actix extractor (this is so that Shift can easily parse new route files and generate the correct typescript types)
pub mod request {
	pub use actix_web::web::{Json as RapidJson, Path as RapidPath, Query as RapidQuery};
}
// Authentication adapters are re-exported under the 'authentication' module
// TODO: add support for auth0 and other providers here as well
pub mod authentication {
	pub use clerk_rs;
}
