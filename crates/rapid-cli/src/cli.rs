use crate::{
	args::flag,
	commands::{self, RapidCommand},
};
use clap::{command, crate_version, ArgMatches, Command};
use colorful::Colorful;
use std::{
	env::{current_dir, current_exe},
	path::PathBuf,
	process::exit,
};

pub type App = Command;

// This should 100% pull from a GCP storage bucket or something that gets updataed in CI when we trigger releases
// TODO: eventually, we should use this to tell the user that they need to update their CLI version
// (we could detect this by comparing this value with the crate_version!() macro value)
pub const RAPID_LATEST_VERSION: &str = "v0.4.3";

/// Returns what the current working directory of the user is
pub fn current_directory() -> PathBuf {
	current_dir().expect("Error: Could not determine the current wrking directory")
}

/// Returns where the installed binary is on the users machine
pub fn binary_dir() -> PathBuf {
	current_exe().expect("Error: Could not determine binary dir.")
}

/// TODO: config fields can be added here later on as needed
pub struct Config {}

pub struct RapidCLI {
	// This config can be used for global env vars that can be passed on CLI init
	pub config: Config,
}

impl RapidCLI {
	pub fn new(config: Config) -> Self {
		Self { config }
	}
	pub fn parse() -> App {
		let usage = "rapid [SUBCAMMAND] [OPTIONS]";
		command!()
			.allow_external_subcommands(true)
			.disable_colored_help(false)
			.override_usage(usage)
			.long_version(crate_version!())
			.help_template(get_help_template())
			.arg(flag("help", "List command(s)"))
			.subcommands(RapidCLI::commands())
	}

	pub fn commands() -> Vec<Command> {
		vec![
			commands::new::New::cmd(),
			commands::init::Init::cmd(),
			commands::run::Run::cmd(),
			commands::templates::Templates::cmd(),
			commands::routes::Routes::cmd(),
		]
	}

	pub fn execute_cammand(cmd: &str) -> Option<fn(&Config, &ArgMatches) -> Result<(), crate::cli::CliError<'static>>> {
		let command_resolver = match cmd {
			"new" => commands::new::New::execute,
			"init" => commands::init::Init::execute,
			"run" => commands::run::Run::execute,
			"templates" => commands::templates::Templates::execute,
			"routes" => commands::routes::Routes::execute,
			_ => return None,
		};

		Some(command_resolver)
	}

	pub fn run(&self, args: ArgMatches) -> Result<(), CliError<'static>> {
		if let Some((cmd, args)) = args.subcommand() {
			// Since we did find a sub-command match, lets exeute the command
			if let Some(cm) = RapidCLI::execute_cammand(cmd) {
				let _ = cm(&self.config, args);
			} else {
				// Show the help command if the user inputted a invalid command
				println!("{}", get_help_template());
				exit(64); // exit 64 is a standard usage error with CLIs
			}
		} else {
			// Show the help template if there was no command match found
			println!("{}", get_help_template());
			exit(64);
		}

		// This outputs only when a command succeeds (would be cool to capture analytics here at some point)
		Ok(())
	}
}

// TODO: update this to actually be a legit health template
// Note: Do not change indentation of this or else it will break
fn get_help_template() -> String {
	format!(
		"RAPID -- Build type-safe applications with Rust and Typescript

Commands:
  {init}	Initialize Rapid functionality in an existing app
  {run}	Run Rapid applications with a single command
  {new} 	Create a new rapid app

Options:
  -V --version	  Print version info and exit

",
		init = "init".bold(),
		run = "run".bold(),
		new = "new".bold()
	)
}

#[derive(Debug)]
pub struct CliError<'a> {
	pub error: Option<&'a str>,
	pub exit_code: i32,
}

impl<'a> CliError<'a> {
	pub fn new(error: &'a str, code: i32) -> CliError<'a> {
		CliError {
			error: Some(error),
			exit_code: code,
		}
	}
}
