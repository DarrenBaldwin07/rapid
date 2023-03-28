use rapid_web::server::RapidServer;
use rapid_web::actix::{web, HttpServer};
use rapid_web::rapid_web_codegen::{main, rapid_handler};
use rapid_web_codegen::{rapid_configure, routes};

rapid_configure!("src/routes");

#[main]
fn main() -> std::io::Result<()> {
    let app = RapidServer::create(None, None, None);


    app.listen(HttpServer::new(move || {
        RapidServer::fs_router(None, None, routes!("src/routes"))
    })).await
}

