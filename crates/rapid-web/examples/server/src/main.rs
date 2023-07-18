use rapid_web::{
	actix::HttpServer,
	rapid_web_codegen::{main, rapid_configure, routes},
	server::RapidServer,
};

rapid_configure!("src/routes");

#[main]
async fn main() -> std::io::Result<()> {
	let app = RapidServer::create(None, None);

	app.listen(HttpServer::new(move || RapidServer::fs_router(None, None, routes!("src/routes"))))
		.await
}
