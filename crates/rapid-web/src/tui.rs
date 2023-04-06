use colorful::{Color, Colorful};
use rapid_cli::cli::rapid_logo;
use tiny_gradient::{GradientDisplay, GradientStr, RGB};

pub fn started_server_message() -> colorful::core::color_string::CString {
	"Started".bg_blue().color(Color::White).bold()
}

pub fn server_init(bind_config: (String, u16)) {
	// This print statement removes all prev terminal logs (aka the same as running a clear command)
	print!("{esc}c", esc = 27 as char);
	let server_url = format!("http://{}:{}", &bind_config.0, &bind_config.1).color(Color::Blue);
	println!(
		"{} {} {} and serving requests: \n\n➜  {} {}",
		rapid_logo(),
		"v0.1.0".bold(),
		started_server_message(),
		"Dev Server:".bold(),
		server_url
	);
}

pub fn clean_console() {
	print!("{esc}c", esc = 27 as char);
}


pub fn rapid_log_target() -> GradientDisplay<'static, [RGB; 4]> {
	let target = GradientStr::gradient(
		&"[rapid-web::logger]",
		[RGB::new(9, 42, 208), RGB::new(26, 78, 96), RGB::new(9, 42, 208), RGB::new(14, 197, 255)],
	);
	target
}
