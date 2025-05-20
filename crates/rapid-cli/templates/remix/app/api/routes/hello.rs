use rapid_web::actix::HttpResponse;
use rapid_web::json_response;
use rapid_web::rapid_web_codegen::rapid_handler;
use serde::Serialize;

pub const ROUTE_KEY: &str = "hello";
pub type RapidOutput = HelloResponse;

#[derive(Serialize)]
pub struct HelloResponse {
    message: String,
}

#[rapid_handler]
pub async fn query() -> HttpResponse {
    let response = HelloResponse {
        message: String::from("Hello from a RAPID rust endpoint!"),
    };
    json_response(response)
}
