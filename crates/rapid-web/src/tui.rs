use colorful::{Color, Colorful};
use std::env;
use log::info;

pub fn server_init(bind_config: (String, u16)) {
	let server_url = format!("http://{}:{}", &bind_config.0, &bind_config.1).color(Color::Blue);
	// Grab the current crate version at compile time...
	let crate_version = env!("CARGO_PKG_VERSION");
	info!(
		"started rapid version {} server on {}",
		crate_version,
		server_url
	);
}