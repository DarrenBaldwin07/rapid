use clap::{Command, Arg, ArgMatches};

use crate::cli::Config;

use super::RapidCommand;


pub struct New {}

impl RapidCommand for  New {
    fn cmd() -> clap::Command {
        Command::new("new")
        .about("Create a new rust-clap-cli  project at <path>")
        .arg(Arg::new("fullstack").required(false))
    }

    fn execute(_: &mut Config, _: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
        println!("> Creating new Rapid project in current working dir!");
        Ok(())
    }
}
