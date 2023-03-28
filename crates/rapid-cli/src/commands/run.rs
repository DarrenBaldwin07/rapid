use super::RapidCommand;
use crate::{
	cli::{current_directory, logo, Config},
	rapid_config::config::{find_rapid_config, is_rapid, AppType},
};
use clap::{arg, value_parser, ArgAction, ArgMatches, Command};
use spinach::Spinach;
use std::{path::PathBuf, process::Command as StdCommand, str::FromStr};
pub struct Run {}

impl RapidCommand for Run {
	fn cmd() -> clap::Command {
		Command::new("run")
			.about("A command for running various rapid applications")
			.arg(
				arg!(
					-server --server "Runs a rapid server application"
				)
				.required(false)
				.action(ArgAction::SetTrue)
				.value_parser(value_parser!(PathBuf)),
			)
			.arg(
				arg!(
					-app --app "Runs a rapid fullstack application"
				)
				.required(false)
				.action(ArgAction::SetTrue)
				.value_parser(value_parser!(PathBuf)),
			)
	}

	fn execute(_: &Config, args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
		// We need to register a handler here to quit the running process
		ctrlc::set_handler(move || {
			std::process::exit(0);
		})
		.expect("Error: Could not stop process");

		println!("{}", logo());
		parse_run_args(args).unwrap();
		// The above code never errors out...
		Ok(())
	}
}

fn parse_run_args(args: &ArgMatches) -> Result<(), ()> {
	// Grab the rapid config file early on because we will need it to for most of the below logic
	let rapid_config = find_rapid_config();

	let server_port = match rapid_config.server {
		Some(server) => match server.port {
			Some(val) => val,
			None => 8080,
		},
		None => 8080,
	};

	// We want to early exit before do anything at all if we are not inside of a rapid application
	if !is_rapid() {
		eprintln!("Could not find a valid config file in the current working directory. Please make sure you are in a official rapid project before running this command.");
		// Exit 64 is a standard error code..
		std::process::exit(64);
	}

	// As we add support for more apps this array can grow
	const RUN_ARGS: [&str; 2] = ["server", "app"];

	for arg in RUN_ARGS {
		match args.get_one::<PathBuf>(arg) {
			Some(val) => {
				if val == &PathBuf::from("true") {
					match arg {
						"server" => {
							handle_run_server(server_port);
							return Ok(());
						}
						"app" => {
							println!("Coming soon!");
							return Ok(());
						}
						// Eventually, "rapid run" should default to running in application mode, not server mode
						_ => {
							println!("{} {}", "No application found for the type: ", arg);
							return Ok(());
						}
					}
				}
			}
			None => {
				println!("No rapid 'run' applications found. Try one of the following: ['server']");
				return Ok(());
			}
		}
	}

	// If no valid args were inputted then we want to fallback to the rapid config file
	let application_type = AppType::from_str(&rapid_config.app_type).expect("Error: invalid rapid application type!");
	match application_type {
		AppType::App => {
			// Currently app does nothing (we are yet to implement this)
			println!("Coming soon...");
		}
		AppType::Server => {
			handle_run_server(server_port);
			return Ok(());
		}
	}

	Ok(())
}

fn handle_run_server(server_port: u16) {
	// Before running this script we need to check if the user has cargo-watch and systemfd on their machine
	// If they do, we want to continue -- however, if they dont, we need to trigger an isntall of the binaries
	let install_list = StdCommand::new("sh")
		.arg("-c")
		.arg("cargo install --list")
		.output()
		.expect("Could not complete pre-run checks.");

	// Check if the user had cargo-watch and systemfd
	if !std::str::from_utf8(&install_list.stdout).unwrap().contains("cargo-watch")
		|| !std::str::from_utf8(&install_list.stdout).unwrap().contains("systemfd")
	{
		let s = Spinach::new("Installing build scripts...");
		// To be safe, lets install both cargo-watch and systemfd
		StdCommand::new("sh")
			.arg("-c")
			.arg("cargo install cargo-watch")
			.output()
			.expect("Could not install rapid dev server binaries. Please try again.");

		StdCommand::new("sh")
			.arg("-c")
			.arg("cargo install systemfd")
			.output()
			.expect("Could not install rapid dev server binaries. Please try again.");

		s.succeed("Rapid build scripts installed!");
	}


	let hot_reload_command = format!("systemfd --no-pid -s http::{} -- cargo watch -x run -q --ignore 'bindings.ts'", server_port);

	StdCommand::new("sh")
		.current_dir(current_directory())
		.arg("-c")
		.arg(hot_reload_command)
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not run development server. Please try again!");
}
