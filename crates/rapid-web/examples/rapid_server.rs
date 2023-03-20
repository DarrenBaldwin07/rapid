extern crate rapid_web;
use rapid_web::{
	actix::{web, HttpResponse, HttpServer},
	server::RapidServer,
};
use rapid_web_codegen::main;

async fn index() -> HttpResponse {
	HttpResponse::Ok().body("Hey there!")
}

#[main]
async fn main() -> std::io::Result<()> {
	let app = RapidServer::create(None, None, None);

	app.listen(HttpServer::new(move || RapidServer::router(None, None).route("/", web::get().to(index))))
		.await
}
