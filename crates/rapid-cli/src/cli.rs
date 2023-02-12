use clap::{Parser, Subcommand};
use crate::commands::new::new_command;
#[derive(Debug, Parser)]
#[clap(name = "rapid")]
#[clap(version, about, long_about = None)]
#[clap(help_template(get_help_template()))]
pub struct RapidCLI {
    #[clap(subcommand)]
    command: Commands,

    /// Env
    #[clap(short, long, default_value = "dev")]
    env: String,

    /// Verbose
    #[clap(short, long)]
    verbose: bool,
}

#[derive(Debug, Subcommand)]
enum Commands {

    /// New
    #[clap(arg_required_else_help = true)]
    New {
        /// Url
        name: String,
    },

    /// Version
    #[clap()]
    Version
}


impl RapidCLI {
    pub fn execute(args: RapidCLI) {
        match args.command {
            Commands::Version => {
                println!("v0.0.1");
            }

            Commands::New { name } => {
                new_command(&name);
            }
        }
    }
}


// TODO: update this to actually be a thing
pub fn get_help_template() -> &'static str {
    "Hello from the R A P I D help template!"
}


#[derive(Debug)]
pub struct CliError<'a> {
    pub error: Option<&'a str>,
    pub exit_code: i32,
}

impl<'a> CliError<'a> {
    pub fn new(error: &'a str, code: i32) -> CliError<'a> {
        CliError {
            error: Some(error),
            exit_code: code,
        }
    }
}
