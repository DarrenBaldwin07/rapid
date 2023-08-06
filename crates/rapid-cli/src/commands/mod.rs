pub mod init;
pub mod new;
pub mod run;
pub mod templates;
pub mod routes;
use crate::cli::{CliError, Config};
use clap::Command;

// Super basic trait for defining what rapid commands should be composed of
pub trait RapidCommand {
	// (1) - Each rapid command must return a clap sub-command with proper config
	fn cmd() -> Command;
	// (2) - All rapid cli commands will have a execute function that they act on
	fn execute(_: &Config, _: &clap::ArgMatches) -> Result<(), CliError<'static>>;
	// TODO: add some kind of "help" thing here for each --help arg on every rapid command
}
