use super::RapidCommand;
use crate::{cli::Config, tui::logo};
use clap::{ArgMatches, Command};

// `rapid routes` command for showing all the route rust files and they map to in url form
pub struct Routes {}

impl RapidCommand for Routes {
	fn cmd() -> clap::Command {
		Command::new("routes").about("Show all the routes in your rapid project!")
	}

	fn execute(_: &Config, args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
		println!("{}", logo());
		println!("> Welcome to RAPID templates");
		Ok(())
	}
}
