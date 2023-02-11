pub mod cli;
pub mod args;
pub mod commands;
use std::process::exit;
use cli::{CliError, get_help_template, RapidCLI};
use clap::{Parser, Command, Subcommand};

fn main() -> Result<(), CliError<'static>> {
    let args = match RapidCLI::parse().try_get_matches() {
        Ok(args) => args,
        Err(_) => {
            return Err(CliError { error: Some("Hello this is an error"), exit_code: 2 });
        }
    };

    if let Some((cmd, args)) = args.subcommand() {
        println!("We found a command!")
    } else {
        println!("{}", get_help_template());
        exit(64);
    }

    // This outputs only when a command succeeds (would be cool to capture analytics here at some point)
    Ok(())
}
