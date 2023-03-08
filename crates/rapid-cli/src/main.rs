pub mod args;
pub mod cli;
pub mod commands;
pub mod constants;
pub mod rapid_config;
use cli::{CliError, Config, RapidCLI};

fn main() -> Result<(), CliError<'static>> {
	// TODO: eventually, the user will be able to persist settings via a global config file
	// and all those settings will be loaded in and passed to this object...
	let app = RapidCLI::new(Config {});
	let args = RapidCLI::parse().get_matches();
	app.run(args)
}
