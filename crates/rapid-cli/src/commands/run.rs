use super::RapidCommand;
use crate::cli::{current_directory, logo, Config};
use crate::rapid_config::config::{is_rapid, find_rapid_config, AppType};
use clap::{arg, value_parser, ArgAction, ArgMatches, Command};
use std::str::FromStr;
use std::{path::PathBuf, process::Command as StdCommand};
use spinach::Spinach;

pub struct Run {}

impl RapidCommand for Run {
	fn cmd() -> clap::Command {
		Command::new("run").about("A command for running various rapid applications").arg(
			arg!(
				-server --server "Runs a rapid server application"
			)
			.required(false)
			.action(ArgAction::SetTrue)
			.value_parser(value_parser!(PathBuf)),
		)
	}

	fn execute(_: &Config, args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
		println!("{}", logo());
		parse_run_args(args).unwrap();
		// The above code never errors out...
		Ok(())
	}
}



fn parse_run_args(args: &ArgMatches) -> Result<(), ()> {
	// // We want to early exit before do anything at all if we are not inside of a rapid application
	if !is_rapid() {
		eprintln!("Could not find a valid config file in the current working directory. Please make sure you are in a official rapid project before running this command.");
		// Exit 64 is a standard error code..
		std::process::exit(64);
	}

	// As we add support for more apps this array can grow
	const RUN_ARGS: [&str; 1] = ["server"];


	for arg in RUN_ARGS {
		match args.get_one::<PathBuf>(arg) {
			Some(val) => {
				if val == &PathBuf::from("true") {
					match arg {
						"server" => {
							handle_run_server();
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
			},
		}
	}

	let rapid_config = find_rapid_config();
	let application_type = AppType::from_str(&rapid_config.app_type).expect("Error: invalid rapid application type!");
	match application_type {
		AppType::App => {
			// Currently app does nothing (we are yet to implement this)
			println!("Coming soon...");
		},
		AppType::Server => {
			handle_run_server();
			return Ok(());
		}
		_ => {
			eprintln!("Error: invalid rapid application type!")
		}
	}

	Ok(())
}


fn handle_run_server() {

	// Before running this script we need to check if the user has cargo-watch and systemfd on their machine
	// If they do, we want to continue -- however, if they dont, we need to trigger an isntall of the binaries
	let install_list = StdCommand::new("sh")
		.arg("-c")
		.arg("cargo install --list")
		.output()
		.expect("Could not complete pre-run checks.");

	// Check if the user had cargo-watch and systemfd
	if !std::str::from_utf8(&install_list.stdout).unwrap().contains("cargo-watch")
		|| !std::str::from_utf8(&install_list.stdout).unwrap().contains("systemfd") {
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

	StdCommand::new("sh")
	.current_dir(current_directory())
	.arg("-c")
	.arg("systemfd --no-pid -s http::8080 -- cargo watch -x run")
	.spawn()
	.unwrap()
	.wait_with_output()
	.expect("command failed to start");

	// We need to register a handler here to quite the running process
	ctrlc::set_handler(move || {
		std::process::exit(0);
	})
	.expect("Error: Could not stop process");
}
