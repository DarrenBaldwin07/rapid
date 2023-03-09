use colorful::{Color, Colorful};
use rapid_cli::cli::rapid_logo;
pub fn started_server_message() -> colorful::core::color_string::CString {
    "Started".bg_blue().color(Color::White).bold()
}

pub fn server_init(bind_config: (String, u16)) {
    // This print statement removes
    print!("{esc}c", esc = 27 as char);
    let server_url = format!("http://{}:{}", &bind_config.0, &bind_config.1).color(Color::Blue);
    println!("{} {} {} and serving requests: \n\n➜  {} {}", rapid_logo(), "v0.1.0".bold(), started_server_message(), "Dev Server:".bold(), server_url);
}
