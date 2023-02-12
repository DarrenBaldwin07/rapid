pub mod cli;
pub mod commands;
use clap::{Parser};

use cli::RapidCLI;

fn main() {
    let args = RapidCLI::parse();
    RapidCLI::execute(args);
}
