use clap::Parser;
use rapid_cli::cli::{execute_command, RapidCLI};
fn main() {
	// TODO: eventually, the user will be able to persist settings via a global config file
	// and all those settings will be loaded in and passed to this object (ex: rapid configure or rapid auth)
	let args = RapidCLI::parse();
	execute_command(&args.command);
}
