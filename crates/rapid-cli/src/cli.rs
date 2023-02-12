use clap::{Command, ArgMatches};
use crate::{args::flag, commands::{self, RapidCommand}};

pub type App = Command;

pub struct Config {

}

pub struct RapidCLI {
    // This config can be used for global env vars that can be passed on CLI init
    pub config: Config,
}

impl RapidCLI {
    pub fn new(config: Config) -> Self {
        Self {
            config
        }
    }
    pub fn parse() -> App {
        let usage = "rapid [SUBCAMMAND] [OPTIONS]";
        App::new("rapid")
            .allow_external_subcommands(true)
            .disable_colored_help(false)
            .override_usage(usage)
            .help_template(get_help_template())
            .arg(flag("version", "Print version info and exit").short('V'))
            .arg(flag("help", "List command(s)"))
            .subcommands(RapidCLI::commands())
    }

    pub fn commands() -> Vec<Command> {
        vec![
            commands::new::New::cmd()
        ]
    }

    pub fn execute_cammand(cmd: &str) ->  Option<fn(&mut Config, &ArgMatches) ->  Result<(), crate::cli::CliError<'static>>> {
        let command_resolver = match cmd {
            "new" => commands::new::New::execute,
            _ => return None,
        };

        Some(command_resolver)
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
