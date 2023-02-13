pub mod cli;
pub mod args;
pub mod commands;
use std::process::exit;
use cli::{CliError, get_help_template, RapidCLI};
use std::path::PathBuf;
use clap::{Parser, Command, Subcommand, arg, value_parser, ArgAction};

fn main() -> Result<(), CliError<'static>> {
    let args = RapidCLI::parse().get_matches();

    if let Some(args) = args.subcommand_matches("new") {
        println!("{:?}", args.get_one::<PathBuf>("fullstack"));
        println!("We found a command!")
    } else {
        println!("{}", get_help_template());
        exit(64);
    }

    // This outputs only when a command succeeds (would be cool to capture analytics here at some point)
    Ok(())
}
