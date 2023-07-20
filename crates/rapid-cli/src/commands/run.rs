use super::RapidCommand;
use crate::{
	cli::{current_directory, Config},
	rapid_config::config::{find_rapid_config, is_rapid, AppType, RapidConfig},
	tui::{logo, rapid_logo},
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

pub fn get_server_port(config: &RapidConfig, fallback_port: u16) -> u16 {
	let app_type = &config.app_type;

	match app_type.as_str() {
		"server" => match &config.server {
			Some(val) => match val.port {
				Some(p) => p,
				None => fallback_port,
			},
			_ => fallback_port,
		},
		"remix" => match &config.remix {
			Some(val) => match val.server_port {
				Some(s_port) => s_port,
				None => fallback_port,
			},
			_ => fallback_port,
		},
		_ => fallback_port,
	}
}

fn parse_run_args(args: &ArgMatches) -> Result<(), ()> {
	// Grab the rapid config file early on because we will need it to for most of the below logic
	let rapid_config = find_rapid_config();

	let server_port = get_server_port(&rapid_config, 8080);

	// We want to early exit before do anything at all if we are not inside of a rapid application
	if !is_rapid() {
		eprintln!("Could not find a valid config file in the current working directory. Please make sure you are in a official rapid project before running this command.");
		// Exit 64 is a standard error code..
		std::process::exit(64);
	}
	// As we add support for more apps this array can grow
	const RUN_ARGS: [&str; 3] = ["server", "remix", "app"];

	for arg in RUN_ARGS {
		match args.get_one::<PathBuf>(arg) {
			Some(val) => {
				if val == &PathBuf::from("true") {
					match arg {
						"server" => {
							handle_run_server(server_port, rapid_config.app_type);
							return Ok(());
						}
						"remix" => {
							handle_run_server(server_port, rapid_config.app_type);
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
			None => break,
		}
	}

	// If no valid args were inputted then we want to fallback to the rapid config file
	let application_type = AppType::from_str(&rapid_config.app_type).expect("Error: invalid rapid application type!");

	match application_type {
		AppType::Nextjs => {
			handle_run_server(server_port, rapid_config.app_type);
			return Ok(());
		}
		AppType::Server => {
			handle_run_server(server_port, rapid_config.app_type);
			return Ok(());
		}
		AppType::Remix => {
			handle_run_server(server_port, rapid_config.app_type);
			return Ok(());
		}
	}
}

fn handle_run_server(server_port: u16, app_type: String) {
	// Before running this script we need to check if the user has cargo-watch and systemfd on their machine
	// If they do, we want to continue -- however, if they dont, we need to trigger an isntall of the binaries
	let install_list = StdCommand::new("sh")
		.arg("-c")
		.arg("cargo install --list")
		.output()
		.expect("Could not complete pre-run checks.");

	// This is the hot reload command that powers how rapid is able to hot-reload its binary
	// It uses a combination of cargo watch and systemfd to achieve this
	// Checkout both crates here:
	// - cargo-watch: https://crates.io/crates/cargo-watch
	// - systemfd: https://crates.io/crates/systemfd
	let mut hot_reload_command = format!(
		"systemfd --no-pid --quiet -s http::{} -- cargo watch -x run -q --ignore 'bindings.ts'",
		server_port
	);

	// If we have a app_type equal to remix we want to use a different watch command (this specific one will only reload the routes dir by default)
	if app_type == String::from("remix") {
		hot_reload_command = String::from("systemfd --no-pid --quiet -s http::8080 -- cargo watch -x run -w app/api -q --ignore 'bindings.ts'");
	}

	// Check if the user had cargo-watch and systemfd
	if !std::str::from_utf8(&install_list.stdout).unwrap().contains("cargo-watch")
		|| !std::str::from_utf8(&install_list.stdout).unwrap().contains("systemfd")
	{
		let s = Spinach::new("Installing build scripts...");
		// To be safe, lets attempt install both cargo-watch and systemfd
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

	println!("{} Building rapid application...", rapid_logo());

	// Trigger the shell command to actually run + watch the rapid server
	StdCommand::new("sh")
		.current_dir(current_directory())
		.arg("-c")
		.arg(hot_reload_command)
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not run development server. Please try again!");
}
