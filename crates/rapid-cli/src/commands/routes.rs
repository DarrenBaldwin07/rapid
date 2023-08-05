use super::RapidCommand;
use crate::{cli::Config, tui::logo, rapid_config::{config::find_rapid_config, config::ServerConfig}};
use clap::{ArgMatches, Command};
use walkdir::WalkDir;
use std::fs::File;
use std::io::Read;

pub const REMIX_ROUTE_PATH: &'static str = "app/api/routes";
pub const NEXTJS_ROUTE_PATH: &'static str = "pages/api/routes";

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


		let route = remove_last_occurrence(&parsed_route_dir.replace(".rs", ""), "index");
		routes.push(route);
	}

	for (index, route) in routes.iter().enumerate() {

	}

	println!("{:?}", routes);
}

pub fn remove_last_occurrence(s: &str, sub: &str) -> String {
	let mut split = s.rsplitn(2, sub);
	let back = split.next().unwrap_or("");
	let front = split.next().unwrap_or("").to_owned();
	front + back
}

pub fn get_routes_dir(rapid_server_config: Option<&ServerConfig>) -> String {
	match rapid_server_config {
		Some(server) => match server.routes_directory.clone() {
			Some(dir) => match dir == "/" {
				true => panic!("The 'routes_directory' variable cannot be set to a base path. Please use something nested!"),
				false => dir,
			},
			None => panic!("Error: the 'routes_directory' variable must be set in your rapid config file!"),
		},
		None => panic!("You must have a valid rapid config file in the base project directory!"),
	}
}
