use super::RapidCommand;
use crate::cli::{logo, Config};
use clap::{ArgMatches, Command};

// Coming soon...(rapid templates for generating landing pages and much more!)
pub struct Templates {}

impl RapidCommand for Templates {
	fn cmd() -> clap::Command {
		Command::new("templates").about("SaaS templates for the rapid framework.")
	}

	fn execute(_: &Config, args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
		println!("{}", logo());
		println!("> Welcome to RAPID templates");
		Ok(())
	}
}
