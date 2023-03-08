use super::RapidCommand;
use crate::cli::{logo, rapid_logo, Config};
use clap::{arg, value_parser, ArgAction, ArgMatches, Command};
use colorful::{Color, Colorful};
use std::path::PathBuf;

pub struct New {}

impl RapidCommand for New {
	fn cmd() -> clap::Command {
		Command::new("new")
			.about("Creates a new rapid project at the current working directory!")
			.arg(
				arg!(
					-full --fullstack "Scaffolds a fullstack rapid project!"
				)
				.required(false)
				.action(ArgAction::SetTrue)
				.value_parser(value_parser!(PathBuf)),
			)
			.arg(
				arg!(
					-server --server "Scaffolds a server-side only rapid project!"
				)
				.required(false)
				.action(ArgAction::SetTrue)
				.value_parser(value_parser!(PathBuf)),
			)
	}

	fn execute(_: &Config, args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
		println!("{}", logo());
		println!("> Creating new Rapid project in current working dir!");
		println!("{:?}", args.get_one::<PathBuf>("fullstack"));
		Ok(())
	}
}
