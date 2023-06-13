use crate::commands::*;
use clap::{Parser, ValueEnum};

// This should 100% pull from a GCP storage bucket or something that gets updataed in CI when we trigger releases
// TODO: eventually, we should use this to tell the user that they need to update their CLI version
// (we could detect this by comparing this value with the crate_version!() macro value)
/// The latest version of rapid
pub const RAPID_LATEST_VERSION: &str = "v0.4.3";

#[derive(Debug, Parser)]
#[command(author, version, about, long_about = None)] //Read from Cargo.toml
/// The Clap derive CLI root
pub struct RapidCLI {
	#[command(subcommand)]
	/// All Rapid Commands
	pub command: RapidCommand,
}

/// Call the execute function for every command
// NOTE: Every command should have an execute function in its module
pub fn execute_command(command: &RapidCommand) -> () {
	use RapidCommand::*;
	match command {
		New(args) => new::execute(args),
		Init(args) => init::execute(args),
		Run(args) => run::execute(args),
		Templates(args) => templates::execute(args),
	}
}

#[derive(Clone, Debug, ValueEnum)]
/// All Rapid supported frameworks
pub enum Framework {
	/// Generate nextjs code
	Nextjs,
	/// Generate remix code
	Remix,
	/// Generate vite code
	Vite,
}
