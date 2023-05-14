extern crate rapid_web;
use rapid_web::{
	actix::{web, HttpResponse, HttpServer},
	server::RapidServer,
};
use rapid_web_codegen::{main, rapid_configure, routes};

// Configure your routes
//rapid_configure!("src/routes");

#[main]
async fn main() -> std::io::Result<()> {
	let app = RapidServer::create(None, None);


    app.listen(HttpServer::new(move || {

        RapidServer::router(None, None) // Use the `routes!()` macro with the fs_router...
    })).await
}
