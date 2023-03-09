extern crate rapid_web;
use rapid_web::server::RapidServer;
use rapid_web::actix::{HttpResponse, web, HttpServer, main};

async fn manual_hello() -> HttpResponse {
    HttpResponse::Ok().body("Hey there!")
}

#[main]
async fn main() -> std::io::Result<()> {
    let app = RapidServer::create(None, None, None, None);

    app.listen(HttpServer::new(move || {
        RapidServer::router(None).route("/", web::get().to(manual_hello))
    })).await
}


