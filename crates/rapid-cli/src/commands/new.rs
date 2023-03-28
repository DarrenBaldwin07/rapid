use super::RapidCommand;use crate::{
	cli::{current_directory, logo, rapid_logo, Config},
	constants::BOLT_EMOJI,
};
use clap::{arg, value_parser, ArgAction, ArgMatches, Command};
use colorful::{Color, Colorful};
use toml::ser;
use std::path::PathBuf;
use include_dir::{include_dir, Dir};

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
		parse_new_args(args);
		Ok(())
	}
}


pub fn parse_new_args(args: &ArgMatches) {
	/// NOTE: We can add more args for templates here (ideally we add nextjs asap)
	const NEW_ARGS: [&str; 2] = ["fullstack", "server"];
	// Get the current working directory of the user
	let current_working_directory = current_directory();

	for arg in NEW_ARGS {
		match args.get_one::<PathBuf>(arg) {
			Some(val) => {
				if val == &PathBuf::from("true") {
					match arg {
						"fullstack" => {
							init_fullstack_template(current_working_directory, arg);
							break;
						}
						"server" => {
							init_server_template(current_working_directory, arg);
							break;
						}
						_ => {
							println!("> Invalid argument passed to new command!");
							break;
						}
					}
				}
			}
			None => {
				println!("> No argument passed to new command!");
				break;
			}
		}
	}
}

pub fn init_fullstack_template(current_working_directory: PathBuf, arg: &str) {
	println!("Coming soon...");
}

pub fn init_server_template(current_working_directory: PathBuf, arg: &str) {
	include_dir!("crates/rapid-cli/src/templates/server").extract(current_working_directory).unwrap();
	println!("{} {:?}...", "Initializing a new rapid-web server application".color(Color::Green), arg);
}
