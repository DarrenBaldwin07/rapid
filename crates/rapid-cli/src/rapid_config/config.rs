use crate::utils::paths::{binary_dir, current_directory};
use serde::Deserialize;
use std::fs::read_to_string;
use strum_macros::EnumString;
use toml;

#[derive(Debug, PartialEq, EnumString)]
#[strum(ascii_case_insensitive)]
#[derive(Deserialize, Clone)]
pub enum AppType {
	App,
	Server,
	Remix,
}

#[derive(Deserialize, Clone)]
pub struct ServerConfig {
	pub port: Option<u16>,
	pub is_logging: Option<bool>,
	pub show_error_pages: Option<bool>,
	pub serve_static_files: Option<bool>,
	pub bindings_export_path: Option<String>,
	pub routes_directory: Option<String>,
	pub typescript_generation: Option<bool>,
}

#[derive(Deserialize, Clone)]
pub struct RemixConfig {
	pub server_port: Option<u16>,
	pub is_logging: Option<bool>,
	pub show_error_pages: Option<bool>,
	pub serve_static_files: Option<bool>,
	pub bindings_export_path: Option<String>,
	pub typescript_generation: Option<bool>,
}

#[derive(Deserialize, Clone)]
/// Eventually rapid will have something called plugins -- for now "features" are simply optional internal functionality
/// that can be toggled by adding the desired feature to this "features" object inside of the rapid.toml config file
pub struct Features {
	// TODO: Add features here as needed
}

#[derive(Deserialize, Clone)]
/// The RapidConfig file schemea
/// # Example:
pub struct RapidConfig {
	pub app_type: String,
	pub features: Option<Features>,
	pub server: Option<ServerConfig>,
	pub remix: Option<RemixConfig>,
}

pub fn find_rapid_config() -> RapidConfig {
	let dir = current_directory();
	// Look for the Rapid config file inside of the current working directory
	let config_file_contents = read_to_string(dir.join("rapid.toml"));

	// Check to make sure that the config file did not throw an error
	if let Err(_) = config_file_contents {
		// TODO: We should improve error log styling later (just uses standard exit 200 best practices for now)
		eprintln!("Could not find a valid config file in the current working directory. Please make sure you are in a project scaffolded with the Rapid CLI.");
		std::process::exit(200);
	}

	// Parse/deserialize the rapid config file from the .toml format
	let rapid_config: RapidConfig = toml::from_str(&config_file_contents.unwrap()).unwrap();

	rapid_config
}

pub fn find_rapid_config_from_binary() -> RapidConfig {
	let dir = binary_dir();
	// Look for the Rapid config file inside of the current working directory
	let config_file_contents = read_to_string(dir.join("rapid.toml"));

	// Check to make sure that the config file did not throw an error
	if let Err(_) = config_file_contents {
		// TODO: We should improve error log styling later (just uses standard exit 200 best practices for now)
		eprintln!("Could not find a valid config file in the current working directory. Please make sure you are in a project scaffolded with the Rapid CLI.");
		std::process::exit(200);
	}

	// Parse/deserialize the rapid config file from the .toml file format
	let rapid_config: RapidConfig = toml::from_str(&config_file_contents.unwrap()).unwrap();

	rapid_config
}

// A helper function to check if the current running process is inside of a rapid application
// aka does it have a rapid.toml
pub fn is_rapid() -> bool {
	let dir = current_directory();

	let config_file_contents = read_to_string(dir.join("rapid.toml"));

	// Check to make sure that the config file did not throw an error
	if let Err(_) = config_file_contents {
		return false;
	}

	return true;
}
