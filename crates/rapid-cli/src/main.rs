pub mod cli;
pub mod args;
pub mod commands;
pub mod constants;
use cli::{CliError, RapidCLI, Config};

fn main() -> Result<(), CliError<'static>> {
    let app = RapidCLI::new(Config {});
    let args = RapidCLI::parse().get_matches();
    app.run(args)
}
