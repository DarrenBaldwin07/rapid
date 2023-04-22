use rapid_web::server::RapidServer;
use rapid_web::actix::{web, HttpServer};
use rapid_web::rapid_web_codegen::{main, routes, rapid_configure_remix};

rapid_configure_remix!();

#[main]
async fn main() -> std::io::Result<()> {
    let app = RapidServer::create(None, None);


    app.listen(HttpServer::new(move || {
        RapidServer::fs_router(None, None, routes!("app/api/routes"))
    })).await
}

