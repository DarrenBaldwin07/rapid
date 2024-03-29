use super::RapidCommand;
use crate::{cli::Config, tui::{logo, chevrons, clean_console}, rapid_config::config::find_rapid_config, util::get_routes_dir};
use clap::{ArgMatches, Command};
use walkdir::WalkDir;
use std::fs::File;
use std::io::Read;
use colorful::{Color, Colorful};
use regex::Regex;
use crate::util::{NEXTJS_ROUTE_PATH, REMIX_ROUTE_PATH};

// `rapid routes` command for showing all the route rust files and they map to in url form
pub struct Routes {}

impl RapidCommand for Routes {
	fn cmd() -> clap::Command {
		Command::new("routes").about("Show all the routes in your rapid project!")
	}

	fn execute(_: &Config, _args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
		println!("{}", logo());
		// Iterate over all the routes in the project and output a map of route file paths to actual http urls:
		let config = find_rapid_config();
		let routes_dir = match config.app_type.as_str() {
			"server" => get_routes_dir(config.server.as_ref()),
			"remix" => REMIX_ROUTE_PATH.to_owned(),
			_ => NEXTJS_ROUTE_PATH.to_owned(),
		};
		generate_routes(&routes_dir);
		Ok(())
	}
}

pub fn generate_routes(routes_dir: &str) {
	let mut routes = vec![];
	for route_file in WalkDir::new(routes_dir.clone()) {
		let entry = match route_file {
			Ok(val) => val,
			Err(e) => panic!("An error occurred what attempting to parse directory: {}", e),
		};

		// We only want to handle route files and no directories (the walkDir crate auto iterates through nested dirs)
		if entry.path().is_dir() {
			continue;
		}

		// Create a reference to the current route file and grab its contents as a string
		let mut file = File::open(&entry.path()).unwrap();
		let mut route_file_contents = String::new();
		file.read_to_string(&mut route_file_contents).unwrap();

		let file_name = entry.file_name();

		// Make sure we ignore middleware and mod files from route generation
		if file_name == "_middleware.rs" || file_name == "mod.rs" {
			continue;
		}

		let parsed_route_dir = entry
			.path()
			.to_str()
			.unwrap_or("/")
			.to_string()
			.replace(routes_dir, "");

		routes.push(parsed_route_dir);
	}

	let total_routes_count = routes.len();

	// Clean the console before printing the routes...
	clean_console();
	println!();

	for route in routes {
		let route_url = remove_last_occurrence(&route.replace(".rs", ""), "index");
		let route_path = format!("{}{}", routes_dir, route);
		println!("{} {} {}\n", route_path, "➜".color(Color::LightCyan).bold(), parse_route_path(route_url).bold());
	}

	println!("{} Found {} routes in your project\n", chevrons(), total_routes_count.to_string().color(Color::Blue).bold());
}

pub fn remove_last_occurrence(s: &str, sub: &str) -> String {
	let mut split = s.rsplitn(2, sub);
	let back = split.next().unwrap_or("");
	let front = split.next().unwrap_or("").to_owned();
	front + back
}




pub fn parse_route_path(route_path: String) -> String {
	let dynamic_route_path_regex = Regex::new(r"/_.*?_").unwrap();

	let mut captures: Vec<String> = Vec::new();

	let mut new_route_path = route_path;

	for pattern_match in dynamic_route_path_regex.captures_iter(&new_route_path) {
		let capture = pattern_match[0].to_string();
		captures.push(capture);
	}

	for path_string in captures {
		let parsed_path_string = path_string.replacen("_", "{", 1).replacen("_", "}", 1);
		new_route_path = new_route_path.replace(&path_string, &parsed_path_string);
	}

	new_route_path
}
