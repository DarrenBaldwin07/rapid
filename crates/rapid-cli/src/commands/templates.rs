use crate::utils::logos::logo;
use clap::Args;

#[derive(Args, Debug)]
/// SaaS templates for the rapid framework. Coming soon...
pub struct TemplatesArgs {}

/// execute the templates command
pub fn execute(_args: &TemplatesArgs) -> () {
	println!("{}", logo());
	println!("> Welcome to RAPID templates");
}
