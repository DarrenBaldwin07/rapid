use colorful::{Color, Colorful};
use rapid_cli::tui::rapid_logo;
use std::env;
use tiny_gradient::{GradientDisplay, GradientStr, RGB};

pub fn started_server_message() -> colorful::core::color_string::CString {
	"Started".bg_blue().color(Color::White).bold()
}

pub fn rapid_chevrons<'a>() -> GradientDisplay<'a, [RGB; 3]> {
	GradientStr::gradient(
		&">>>",
		[RGB::new(9, 42, 208), RGB::new(26, 78, 96), RGB::new(9, 42, 208)],
	)
}

pub fn gradient_text<'a>(text: &'a str) -> GradientDisplay<'a, [RGB; 3]> {
	GradientStr::gradient(
		text,
		[RGB::new(9, 42, 208), RGB::new(26, 78, 96), RGB::new(9, 42, 208)],
	)
}

pub fn server_init(bind_config: (String, u16)) {
	let server_url = format!("http://{}:{}", &bind_config.0, &bind_config.1).color(Color::Blue);
	// Grab the current crate version at compile time...
	let crate_version = env!("CARGO_PKG_VERSION");
	println!(
		"\n{} {} {} and serving requests: \n\n➜  {} {}\n",
		rapid_logo(),
		crate_version.bold(),
		started_server_message(),
		"Dev Server:".bold(),
		server_url
	);
}

#[allow(dead_code)]
pub fn clean_console() {
	print!("{esc}c", esc = 27 as char);
}

#[allow(dead_code)]
pub fn rapid_log_target() -> GradientDisplay<'static, [RGB; 4]> {
	let target = GradientStr::gradient(
		&"[rapid-web::logger]",
		[RGB::new(9, 42, 208), RGB::new(26, 78, 96), RGB::new(9, 42, 208), RGB::new(14, 197, 255)],
	);
	target
}

#[allow(dead_code)]
pub fn rapid_error(message: &str) {
	println!("{}", message.color(Color::Red).bold());
}
