use clap::{Command, ArgAction, ArgMatches, arg, value_parser};
use std::path::PathBuf;
use std::env::{current_exe, current_dir};
use crate::cli::{Config, rapid_logo, logo};
use crate::constants::BOLT_EMOJI;
use super::RapidCommand;
use std::{collections::HashMap, process::Command as BashCommand, thread};
use colorful::Color;
use colorful::Colorful;

pub struct Init {}

impl RapidCommand for  Init {
    fn cmd() -> clap::Command {
        Command::new("init")
        .about("A command for initializing Rapid libraries in your projects!")
        .arg(
            arg!(
                -vite --vite "initializes rapid-ui in your React + Vitejs project!"
            )
            .required(false)
            .action(ArgAction::SetTrue)
            .value_parser(value_parser!(PathBuf)),
        )
        .arg(
            arg!(
                -remix --remix "initializes rapid-ui in your Remix.run application!"
            )
            .required(false)
            .action(ArgAction::SetTrue)
            .value_parser(value_parser!(PathBuf)),
        )
    }

    fn execute(_: &Config, args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
        println!("{}", logo());
        parse_init_args(args);
        Ok(())
    }
}


fn parse_init_args(args: &ArgMatches) {
    /// NOTE: We can add more args for templates here (ideally we add nextjs asap)
    const INIT_ARGS: [&str; 2] = ["vite", "remix"];

    for arg in INIT_ARGS {
        match args.get_one::<PathBuf>(arg) {
            Some(val) => {
                if val == &PathBuf::from("true") {
                    match arg {
                        "vite" => {
                            println!("Binary dir: {}", current_exe().unwrap().display());
                            println!("Current dir: {}", current_dir().unwrap().display());
                            println!("{} {:?}...", "Initializing rapid-ui with the template".color(Color::Green), arg);
                            BashCommand::new("sh")
                            .arg("pwd")
                            .spawn()
                            .unwrap()
                            .wait_with_output()
                            .expect("Could not create template files. Please try again!");
                            println!("{} {} {} {}", format!("{}", rapid_logo()).bold(), "Success".bg_blue().color(Color::White).bold(), BOLT_EMOJI, "Rapid-ui has been initialized in your project!");
                            break;
                        }
                        "remix" => {
                            println!("{} {:?}...", "Initializing rapid-ui with the template".color(Color::Green), arg);
                            println!("{} {} {} {}", format!("{}", rapid_logo()).bold(), "Success".bg_blue().color(Color::White).bold(), BOLT_EMOJI, "Rapid-ui has been initialized in your project!");
                            break;
                        }
                        _ => {
                            println!("{} {}", "No template found. Please try '--vite' or '--remix'".color(Color::Red), arg);
                            break;
                        }
                    }
                }

            }
            None => {
                println!("{} {}", "No template found. Please try '--vite' or '--remix'".color(Color::Red), arg);
            }
        }
    }
}


