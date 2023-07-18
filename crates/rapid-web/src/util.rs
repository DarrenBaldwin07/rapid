use super::{server::RAPID_SERVER_CONFIG, shift::util::is_valid_handler, tui::rapid_log_target};
use colorful::{Color, Colorful};
use core::panic;
use log::info;
use rapid_cli::rapid_config::config::{RapidConfig, ServerConfig};
use std::{env::current_dir, fs::File, io::Read, path::PathBuf};
use syn::{parse_file, parse_str, File as SynFile, Item};
use walkdir::WalkDir;

pub const REMIX_ROUTE_PATH: &'static str = "app/api/routes";
pub const NEXTJS_ROUTE_PATH: &'static str = "pages/api/routes";

/// Checks to make sure that there are no conflicting routes in the handlers directory
/// If there are, it prints helpful warnings to the user
pub fn check_for_invalid_handlers(dir: &str) {
	for entry in WalkDir::new(dir).into_iter().filter_map(|e| e.ok()) {
		// Check to make sure that the rust file is not a mod.rs file and is valid (it also cannot be a middleware file either)
		if entry.path().extension().and_then(|ext| ext.to_str()) == Some("rs")
			&& entry.path().file_name().and_then(|name| name.to_str()) != Some("mod.rs")
			&& entry.path().file_name().and_then(|name| name.to_str()) != Some("_middleware.rs")
		// TODO: we can exclude other files here (may want to include _types.rs)
		{
			// Read the rust file to a string
			let mut file = File::open(entry.path()).unwrap();
			let mut file_contents = String::new();
			file.read_to_string(&mut file_contents).unwrap();

			// Check if the handler is invalid (this is specifically for the actual function itself)
			if !validate_route_handler(&file_contents) || !is_valid_route_function(&file_contents) {
				// Show warning logs to the user as needed
				println!("\n"); // Each log should have a indent of 1 so that we get some nice spacing
				info!(
					"{} Found invalid route handler file at {}",
					rapid_log_target(),
					format!("`{}`", entry.path().to_str().expect("Error: could not parse invalid route handler")).color(Color::LightCyan)
				);
			}
		}
	}
}

/// Note: this is a dupe of a function in the rapid-web-codegen crate (ideally we create a rapid-web-utils crate at some point)
/// Helper function for checking if a rapid route file is valid
/// We need this so that we can generate actix-web routes for only valid route files
pub fn validate_route_handler(handler_source: &String) -> bool {
	// Check if the file is actually valid rust code
	// If not, we want to output a invalid route rusult (false)
	// This covers any cases where the user could have a non-rust file in the routes directory
	if parse_file(handler_source).is_err() {
		return false;
	}
	// Parse the file into a syn file
	// Its possible that this could fail if the file is not valid rust code (ex: a user has a txt file in the routes folder)
	// -- however, it wont happen because this case is caught in the if-statement above
	let parsed_file: SynFile = parse_str(handler_source.as_str()).expect("An error occurred when attempting to parse a rapid route handler file.");

	// We define a valid route as having a rapid handler macro and it only containing one handler function
	// Rapid will ignore all files that have more than one handler
	let mut has_rapid_handler = false;
	let mut handler_count = 0;

	for item in parsed_file.items {
		if let Item::Fn(function) = item {
			let is_valid = is_valid_handler("rapid_handler", function.attrs);
			if is_valid {
				has_rapid_handler = true;
				handler_count += 1;
			}
		}
	}

	has_rapid_handler && handler_count == 1
}

/// Make sure there is a valid function with the correct HTTP method
pub fn is_valid_route_function(file_contents: &str) -> bool {
	if file_contents.contains("async fn get") {
		return true;
	} else if file_contents.contains("async fn post") {
		return true;
	} else if file_contents.contains("async fn delete") {
		return true;
	} else if file_contents.contains("async fn put") {
		return true;
	} else if file_contents.contains("async fn patch") {
		return true;
	} else if file_contents.contains("async fn query") {
		return true;
	} else if file_contents.contains("async fn mutation") {
		return true;
	}

	false
}

/// Function for getting the routes directory from the rapid config file
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

pub fn get_server_port(config: RapidConfig, fallback_port: u16) -> u16 {
	let app_type = config.app_type;

	match app_type.as_str() {
		"server" => match config.server {
			Some(val) => match val.port {
				Some(p) => p,
				None => fallback_port,
			},
			_ => fallback_port,
		},
		"remix" => match config.remix {
			Some(val) => match val.server_port {
				Some(s_port) => s_port,
				None => fallback_port,
			},
			_ => fallback_port,
		},
		_ => match config.nextjs {
			Some(val) => match val.server_port {
				Some(s_port) => s_port,
				None => fallback_port,
			},
			_ => fallback_port,
		},
	}
}

pub fn should_generate_types(config: RapidConfig) -> bool {
	let app_type = config.app_type.as_str();

	match app_type {
		"server" => match config.server.as_ref() {
			Some(server) => match server.typescript_generation.clone() {
				Some(val) => val,
				None => true,
			},
			None => true,
		},
		"remix" => match config.remix.as_ref() {
			Some(remix) => match remix.typescript_generation.clone() {
				Some(val) => val,
				None => true,
			},
			None => true,
		},
		_ => match config.nextjs.as_ref() {
			Some(nextjs) => match nextjs.typescript_generation.clone() {
				Some(val) => val,
				None => true,
			},
			None => true,
		},
	}
}

/// Gets the bindings_out_directory from a valid `RapidConfig` object
pub fn get_bindings_directory() -> PathBuf {
	match RAPID_SERVER_CONFIG.app_type.as_str() {
		"server" => match RAPID_SERVER_CONFIG.server.as_ref() {
			Some(server) => match server.bindings_export_path.clone() {
				Some(dir) => match dir == "/" {
					true => current_dir().expect("Could not parse bindings export path found in rapid config file."),
					false => current_dir()
						.expect("Could not parse bindings export path found in rapid config file.")
						.join(PathBuf::from(dir)),
				},
				None => panic!("Error: the 'bindings_export_path' variable must be set in your rapid config file!"),
			},
			None => panic!("You must have a valid rapid config file in the base project directory!"),
		},
		"remix" => match RAPID_SERVER_CONFIG.remix.as_ref() {
			Some(remix) => match remix.bindings_export_path.clone() {
				Some(dir) => match dir == "/" {
					true => current_dir().expect("Could not parse bindings export path found in rapid config file."),
					false => current_dir()
						.expect("Could not parse bindings export path found in rapid config file.")
						.join(PathBuf::from(dir)),
				},
				None => panic!("Error: the 'bindings_export_path' variable must be set in your rapid config file!"),
			},
			None => panic!("You must have a valid rapid config file in the base project directory!"),
		},
		_ => match RAPID_SERVER_CONFIG.nextjs.as_ref() {
			Some(nextjs) => match nextjs.bindings_export_path.clone() {
				Some(dir) => match dir == "/" {
					true => current_dir().expect("Could not parse bindings export path found in rapid config file."),
					false => current_dir()
						.expect("Could not parse bindings export path found in rapid config file.")
						.join(PathBuf::from(dir)),
				},
				None => panic!("Error: the 'bindings_export_path' variable must be set in your rapid config file!"),
			},
			None => panic!("You must have a valid rapid config file in the base project directory!"),
		},
	}
}

pub fn is_logging() -> bool {
	match RAPID_SERVER_CONFIG.app_type.as_str() {
		"server" => match RAPID_SERVER_CONFIG.server.as_ref() {
			Some(value) => value.is_logging.unwrap_or(true),
			None => true,
		},
		"remix" => match RAPID_SERVER_CONFIG.remix.as_ref() {
			Some(value) => value.is_logging.unwrap_or(true),
			None => true,
		},
		_ => match RAPID_SERVER_CONFIG.nextjs.as_ref() {
			Some(value) => value.is_logging.unwrap_or(true),
			None => true,
		},
	}
}

pub fn is_serving_static_files() -> bool {
	match RAPID_SERVER_CONFIG.app_type.as_str() {
		"server" => match RAPID_SERVER_CONFIG.server.as_ref() {
			Some(value) => value.serve_static_files.unwrap_or(true),
			None => true,
		},
		"remix" => match RAPID_SERVER_CONFIG.remix.as_ref() {
			Some(value) => value.serve_static_files.unwrap_or(true),
			None => true,
		},
		_ => match RAPID_SERVER_CONFIG.nextjs.as_ref() {
			Some(value) => value.serve_static_files.unwrap_or(true),
			None => true,
		},
	}
}


