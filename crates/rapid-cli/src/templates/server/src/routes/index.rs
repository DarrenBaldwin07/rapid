use rapid_web::actix::HttpResponse;
use rapid_web::rapid_web_codegen::rapid_handler;

#[rapid_handler]
pub async fn get() -> HttpResponse {
    HttpResponse::Ok().body("Welcome to Rapid Web!")
}
