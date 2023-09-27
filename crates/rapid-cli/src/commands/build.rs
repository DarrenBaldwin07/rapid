use super::RapidCommand;
use crate::{cli::Config, tui::logo, rapid_config::config::find_rapid_config, util::{NEXTJS_ROUTE_PATH, REMIX_ROUTE_PATH, get_routes_dir}};
use clap::{ArgMatches, Command};

pub struct Build {}

impl RapidCommand for Build {
	fn cmd() -> clap::Command {
		Command::new("build").about("Trigger a traditional rapid build for generating types and validating handlers")
	}

	fn execute(_: &Config, _args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
		println!("{}", logo());
		let config = find_rapid_config();
		let routes_dir = match config.app_type.as_str() {
			"server" => get_routes_dir(config.server.as_ref()),
			"remix" => REMIX_ROUTE_PATH.to_owned(),
			_ => NEXTJS_ROUTE_PATH.to_owned(),
		};



		Ok(())
	}
}
