use crate::rapid_config::config::{ServerConfig, RapidConfig};
use std::{path::PathBuf, env::current_dir};

pub const REMIX_ROUTE_PATH: &'static str = "app/api/routes";
pub const NEXTJS_ROUTE_PATH: &'static str = "pages/api/routes";

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

pub fn get_bindings_directory(config: RapidConfig) -> PathBuf {
	match config.app_type.as_str() {
		"server" => match config.server.as_ref() {
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
		"remix" => match config.remix.as_ref() {
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
		_ => match config.nextjs.as_ref() {
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
