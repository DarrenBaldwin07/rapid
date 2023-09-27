use super::RapidCommand;
use crate::{cli::Config, tui::logo};
use clap::{ArgMatches, Command};

pub struct Build {}

impl RapidCommand for Build {
	fn cmd() -> clap::Command {
		Command::new("build").about("Trigger a traditional rapid build for generating types and validating handlers")
	}

	fn execute(_: &Config, _args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
		println!("{}", logo());
		Ok(())
	}
}
