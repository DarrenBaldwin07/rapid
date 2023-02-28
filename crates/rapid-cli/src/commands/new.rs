use clap::{Command, ArgAction, ArgMatches, arg, value_parser};
use std::path::PathBuf;
use crate::cli::{Config, rapid_logo, logo};
use super::RapidCommand;
use colorful::Color;
use colorful::Colorful;

pub struct New {}

impl RapidCommand for  New {
    fn cmd() -> clap::Command {
        Command::new("new")
        .about("Creates a new rapid project at the current working directory!")
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
                -server --server "Scaffolds a server-side only rapid project!"
            )
            .required(false)
            .action(ArgAction::SetTrue)
            .value_parser(value_parser!(PathBuf)),
        )
    }

    fn execute(_: &Config, args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
        println!("{}", logo());
        println!("> Creating new Rapid project in current working dir!");
        println!("{:?}", args.get_one::<PathBuf>("fullstack"));
        Ok(())
    }
}
