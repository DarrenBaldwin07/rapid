use clap::{Command, ArgAction, ArgMatches, arg, value_parser};

use std::path::PathBuf;

use crate::cli::Config;

use super::RapidCommand;


pub struct New {}

impl RapidCommand for  New {
    fn cmd() -> clap::Command {
        Command::new("new")
        .about("Create a new rust-clap-cli project at <path>")
        .arg(
            arg!(
                -full --fullstack "Scaffolds a fullstack rapid project!"
            )
            .required(false)
            .action(ArgAction::SetTrue)
            .value_parser(value_parser!(PathBuf)),
        )
        .arg(
            arg!(
                -server "Scaffolds a server-side only rapid project!"
            )
            .required(false)
            .action(ArgAction::SetTrue)
            .value_parser(value_parser!(PathBuf)),
        )
    }

    fn execute(_: &Config, args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
        println!("> Creating new Rapid project in current working dir!");
        println!("{:?}", args.get_one::<PathBuf>("fullstack"));
        Ok(())
    }
}
