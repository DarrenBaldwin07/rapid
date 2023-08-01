use colorful::{Color, Colorful};
use rapid_cli::tui::rapid_logo;
use std::env;

pub fn server_init(bind_config: (String, u16)) {
	let server_url = format!("http://{}:{}", &bind_config.0, &bind_config.1).color(Color::Blue);
	// Grab the current crate version at compile time...
	let crate_version = env!("CARGO_PKG_VERSION");
	println!(
		"{} {} server running at: \n\n➜ {} {}",
		rapid_logo(),
		crate_version.bold(),
		"local:".bold(),
		server_url
	);
}