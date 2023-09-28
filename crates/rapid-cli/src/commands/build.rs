use super::RapidCommand;
use crate::{cli::Config, tui::logo, rapid_config::config::find_rapid_config, util::{NEXTJS_ROUTE_PATH, REMIX_ROUTE_PATH, get_routes_dir, get_bindings_directory}, tui::chevrons};
use clap::{ArgMatches, Command};
use rapid_web::shift::generate::create_typescript_types;
use std::env::current_dir;

pub struct Build {}

impl RapidCommand for Build {
	fn cmd() -> clap::Command {
		Command::new("build").about("Trigger a traditional rapid build for generating types and validating handlers")
	}

	fn execute(_: &Config, _args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
		println!("{}", logo());
		// TODO: this command could also run a `cargo build` (only issue is that we would have to support all the args that cargo allows)

		let config = find_rapid_config();
		let routes_dir = match config.app_type.as_str() {
			"server" => get_routes_dir(config.server.as_ref()),
			"remix" => REMIX_ROUTE_PATH.to_owned(),
			_ => NEXTJS_ROUTE_PATH.to_owned(),
		};

		let every_dir_types_gen = match config.clone().app_type.as_str() {
			"server" => match config.clone().server {
				Some(server) => match server.typescript_generation_directory {
					Some(value) => value,
					None => "".to_string(),
				},
				None => "".to_string(),
			},
			"remix" => match config.clone().remix {
				Some(remix) => match remix.typescript_generation_directory {
					Some(value) => value,
					None => "".to_string(),
				},
				None => "".to_string(),
			},
			_ => match config.clone().nextjs {
				Some(nextjs) => match nextjs.typescript_generation_directory {
					Some(value) => value,
					None => "".to_string(),
				},
				None => "".to_string(),
			},
		};

		let routes_directory = current_dir()
		.expect("Could not parse routes direcory path found in rapid config file.")
		.join(std::path::PathBuf::from(routes_dir.clone()));

		let type_generation_directory = if every_dir_types_gen != "" {
			current_dir()
				.expect("Could not parse current directory while executing type generation!")
				.join(every_dir_types_gen)
		} else {
			// If the typegen directory was not defined by the user, simply fallback to only doing handler types in the routes directorys
			routes_directory.clone()
		};

		create_typescript_types(get_bindings_directory(config), routes_directory, type_generation_directory);

		println!("{} Rapid build completed!", chevrons());

		Ok(())
	}
}
