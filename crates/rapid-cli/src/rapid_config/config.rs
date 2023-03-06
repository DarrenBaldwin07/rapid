use serde::Deserialize;
use toml;
use std::fs::read_to_string;
use crate::cli::current_directory;


#[derive(Deserialize)]
pub struct AppConfig {
    // TODO: Add app options here as needed
        // host port
        // api url
        // include_environment_variables
}

#[derive(Deserialize)]
pub struct ServerConfig {
    pub port: Option<u16>,
    pub is_logging: bool,
    pub show_error_pages: bool,
}

#[derive(Deserialize)]
/// Eventually rapid will have something called plugins -- for now "features" are simply optional internal functionality
/// that can be toggled by adding the desired feature to this "features" object inside of the rapid.toml config file
pub struct Features {
    // TODO: Add features here as needed
}


#[derive(Deserialize)]
pub struct RapidConfig {
    pub app_type: String,
    pub app_config: Option<AppConfig>,
    pub features: Option<Features>,
    pub server: Option<ServerConfig>,
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
