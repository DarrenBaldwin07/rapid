use rapid_web::actix::HttpResponse;

pub async fn get() -> HttpResponse {
    HttpResponse::Ok().body("Welcome to Rapid Web!")
}
