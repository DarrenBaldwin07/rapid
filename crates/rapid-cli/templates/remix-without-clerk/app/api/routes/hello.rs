use rapid_web::actix::HttpResponse;
use rapid_web::rapid_web_codegen::rapid_handler;

pub const ROUTE_KEY: &str = "hello";

#[rapid_handler]
pub async fn query() -> HttpResponse {
    HttpResponse::Ok().body("Hello from a RAPID rust endpoint!")
}
