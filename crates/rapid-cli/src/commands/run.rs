use super::RapidCommand;
use crate::cli::{current_directory, logo, Config};
use clap::{arg, value_parser, ArgAction, ArgMatches, Command};
use std::{io::Write, path::PathBuf, process::Command as StdCommand};

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
		parse_run_args(args);
		// The above code never errors out...
		Ok(())
	}
}

fn parse_run_args(args: &ArgMatches) {
	// As we add support for more apps this array can grow
	const RUN_ARGS: [&str; 1] = ["server"];

	for arg in RUN_ARGS {
		match args.get_one::<PathBuf>(arg) {
			Some(val) => {
				if val == &PathBuf::from("true") {
					match arg {
						"server" => {
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
							break;
						}
						_ => {
							println!("{} {}", "No application found for the type: ", arg);
							break;
						}
					}
				}
			}
			None => println!("none"),
		}
	}
}
