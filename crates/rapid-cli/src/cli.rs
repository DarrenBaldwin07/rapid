use crate::{
	args::flag,
	commands::{self, RapidCommand},
};
use clap::{command, crate_version, ArgMatches, Command};
use colorful::Colorful;
use reqwest::blocking::Client;
use serde_json::Value;
use std::{
	env::{current_dir, current_exe},
	path::PathBuf,
	process::exit,
	sync::OnceLock,
	time::Duration,
};

pub type App = Command;

// Fetch the latest version from GitHub API
static LATEST_VERSION: OnceLock<String> = OnceLock::new();

/// Fetches the latest version from GitHub API
/// Falls back to a default version if the API request fails
fn fetch_latest_version() -> String {
    let client = Client::new();
    
    // Try to fetch from GitHub API
    let result = client
        .get("https://api.github.com/repos/DarrenBaldwin07/rapid/releases/latest")
        .timeout(Duration::from_secs(2))
        .header("User-Agent", format!("rapid-cli/{}", crate_version!()))
        .send()
        .and_then(|res| res.json::<Value>())
        .ok();
    
    if let Some(json) = result {
        if let Some(tag_name) = json["tag_name"].as_str() {
            return tag_name.to_string();
        }
    }
    
    // Fall back to hardcoded version if API call fails
    "v0.6.0".to_string()
}

/// Get the latest Rapid version
/// Uses a static OnceLock to ensure we only fetch it once per CLI execution
pub fn rapid_latest_version() -> &'static str {
    LATEST_VERSION.get_or_init(fetch_latest_version).as_str()
}

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
			commands::build::Build::cmd()
		]
	}

	pub fn execute_cammand(cmd: &str) -> Option<fn(&Config, &ArgMatches) -> Result<(), crate::cli::CliError<'static>>> {
		let command_resolver = match cmd {
			"new" => commands::new::New::execute,
			"init" => commands::init::Init::execute,
			"run" => commands::run::Run::execute,
			"templates" => commands::templates::Templates::execute,
			"routes" => commands::routes::Routes::execute,
			"build" => commands::build::Build::execute,
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

		// Check if there's a newer version available
		self.check_for_updates();

		// This outputs only when a command succeeds (would be cool to capture analytics here at some point)
		Ok(())
	}
	
	fn check_for_updates(&self) {
		let current_version = crate_version!();
		let latest_version = rapid_latest_version();
		
		// Remove 'v' prefix from latest_version for comparison if it exists
		let latest_version_str = if latest_version.starts_with('v') {
			&latest_version[1..]
		} else {
			latest_version
		};
		
		if latest_version_str != current_version {
			println!(
				"\n{} A new version of Rapid is available: {} (you have {})",
				"⚠️".yellow(),
				latest_version.green().bold(),
				current_version.yellow()
			);
			println!("  Run 'cargo install rapid-cli@{}' to update", latest_version_str);
		}
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
