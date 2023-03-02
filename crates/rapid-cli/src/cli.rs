use clap::{Command, ArgMatches, command};
use crate::constants::LOGO;
use crate::{args::flag, commands::{self, RapidCommand}};
use std::process::exit;
use tiny_gradient::{GradientDisplay, GradientStr, RGB};
pub type App = Command;

// Logo with signs
pub fn rapid_logo<'a>() -> GradientDisplay<'a, [RGB; 4]> {
    ">>> R A P I D".gradient([RGB::new(9, 42, 208), RGB::new(26, 78, 96), RGB::new(9, 42, 208), RGB::new(14, 197, 255)])
}

// Normal Logo
pub fn rapid_logo_small<'a>() -> GradientDisplay<'a, [RGB; 4]> {
    "R A P I D".gradient([RGB::new(9, 42, 208), RGB::new(26, 78, 96), RGB::new(9, 42, 208), RGB::new(14, 197, 255)])
}

// Large Ascii printed logo
pub fn logo<'a>() -> GradientDisplay<'a, [RGB; 4]> {
    LOGO.gradient([RGB::new(9, 42, 208), RGB::new(26, 78, 96), RGB::new(9, 42, 208), RGB::new(14, 197, 255)])
}

/// TODO: config fields can be added here later on as needed
pub struct Config {}

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
        command!()
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
            commands::new::New::cmd(),
            commands::init::Init::cmd()
        ]
    }

    pub fn execute_cammand(cmd: &str) ->  Option<fn(&Config, &ArgMatches) ->  Result<(), crate::cli::CliError<'static>>> {
        let command_resolver = match cmd {
            "new" => commands::new::New::execute,
            "init" => commands::init::Init::execute,
            _ => return None,
        };

        Some(command_resolver)
    }

    pub fn run(&self, args: ArgMatches) -> Result<(), CliError<'static>> {
        if let Some((cmd, args)) = args.subcommand() {
            // Since we did find a sub-command match, lets exeute the command
            if let Some(cm) = RapidCLI::execute_cammand(cmd) {
                let _ = cm(&self.config, args);
            }
        } else {
            // Show the help template if there was no command match found
            println!("{}", get_help_template());
            exit(64);
        }

        // This outputs only when a command succeeds (would be cool to capture analytics here at some point)
        Ok(())
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
