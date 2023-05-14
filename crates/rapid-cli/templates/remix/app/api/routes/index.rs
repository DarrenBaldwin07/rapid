use rapid_web::actix::HttpResponse;
use rapid_web::{rapid_web_codegen::rapid_handler, welcome_view};

pub const ROUTE_KEY: &str = "index";

#[rapid_handler]
pub async fn query() -> HttpResponse {
    HttpResponse::Ok()
    .content_type("text/html; charset=utf-8")
    .body(welcome_view)
}
