use super::RapidCommand;
use crate::{
	cli::{current_directory, logo, rapid_logo, Config},
	constants::BOLT_EMOJI,
};
use clap::{arg, value_parser, ArgAction, ArgMatches, Command};
use colorful::{Color, Colorful};
use rust_embed::RustEmbed;
use std::{
	fs::{write, File},
	path::PathBuf,
	thread, time,
};

#[derive(RustEmbed)]
#[folder = "src/templates/rapidUI/reactVite/"]
struct Asset;

#[derive(RustEmbed)]
#[folder = "src/templates/rapidUI/remix/"]
struct RemixAssets;

pub struct Init {}

impl RapidCommand for Init {
	fn cmd() -> clap::Command {
		Command::new("init")
			.about("A command for initializing Rapid libraries in your projects!")
			.subcommand(Command::new("fullstack").about("A command for initializing a fullstack rapid application in your react projects!"))
			.subcommand(
				Command::new("ui")
					.about("A command for initializing Rapid-UI in your react projects!")
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
					),
			)
	}

	fn execute(_: &Config, args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
		println!("{}", logo());
		parse_init_args(args);
		Ok(())
	}
}

pub fn ui_subcommand_handler(init_args: [&str; 2], subcommand_args: &ArgMatches, current_working_directory: PathBuf) {
	for ui_arg in init_args {
		match subcommand_args.get_one::<PathBuf>(ui_arg) {
			Some(val) => {
				if val == &PathBuf::from("true") {
					match ui_arg {
						"vite" => {
							init_vite_template(current_working_directory, ui_arg);
							break;
						}
						"remix" => {
							init_remix_template(current_working_directory, ui_arg);
							break;
						}
						_ => {
							println!("{}", "No template found. Please try '--vite' or '--remix'".color(Color::Red));
							break;
						}
					}
				} else {
					println!("{}", "No template found. Please try '--vite' or '--remix'".color(Color::Red));
					break;
				}
			}
			None => {
				println!("{}", "No template found. Please try '--vite' or '--remix'".color(Color::Red));
			}
		}
	}
}

fn parse_init_args(args: &ArgMatches) {
	/// NOTE: We can add more args for templates here (ideally we add nextjs asap)
	const UI_INIT_ARGS: [&str; 2] = ["vite", "remix"];
	const INIT_COMMANDS: [&str; 2] = ["ui", "fullstack"];
	// Get the current working directory of the user
	let current_working_directory = current_directory();
	for arg in INIT_COMMANDS {
		match args.subcommand() {
			Some((name, subcommand_args)) => {
				match name {
					"ui" => {
						ui_subcommand_handler(UI_INIT_ARGS, subcommand_args, current_working_directory);
						return;
					}
					"fullstack" => {
						// TODO: this will be the command that runs for initializing a new rapid app inside of an existing nextjs or remix application
						println!("Coming soon...");
						return;
					}
					_ => {
						println!("{} {}", "No init scripts found.".color(Color::Red), arg);
						break;
					}
				}
			}
			None => {} // Do nothing if we dont find anythign
		}
	}

	println!("{}", "No init scripts found!".color(Color::Red));
}

pub fn init_vite_template(current_working_directory: PathBuf, arg: &str) {
	println!("{} {:?}...", "Initializing rapid-ui with the template".color(Color::Green), arg);
	let tailwind_config_contents = Asset::get("tailwind.config.js").unwrap();
	let postcss_config_contents = Asset::get("postcss.config.js").unwrap();
	let index_css_contents = Asset::get("index.css").unwrap();
	// Make the two config files that we need
	File::create(current_working_directory.join("tailwind.config.js")).expect("Failed to create a tailwind config file. Please try again!");
	File::create(current_working_directory.join("postcss.config.js")).expect("Failed to create a postcss config file. Please try again!");
	File::create(current_working_directory.join("src/index.css")).expect("Failed to create the css entrypoint file. Please try again!");
	// Write the contents of the config files
	write("tailwind.config.js", std::str::from_utf8(tailwind_config_contents.data.as_ref()).unwrap())
		.expect("Could not write to tailwind config file!");
	write("postcss.config.js", std::str::from_utf8(postcss_config_contents.data.as_ref()).unwrap()).expect("Could not write to postcss config file!");
	write("src/index.css", std::str::from_utf8(index_css_contents.data.as_ref()).unwrap()).expect("Could not write to index.css file!");

	// Sleep a little to show loading animation, etc (there is a nice one we could use from the "tui" crate)
	let timeout = time::Duration::from_millis(500);
	thread::sleep(timeout);

	println!(
		"{} {} {} {}",
		format!("{}", rapid_logo()).bold(),
		"Success".bg_blue().color(Color::White).bold(),
		BOLT_EMOJI,
		"Rapid-ui has been initialized in your Vite project!"
	);
}

pub fn init_remix_template(current_working_directory: PathBuf, arg: &str) {
	println!("{} {:?}...", "Initializing rapid-ui with the template".color(Color::Green), arg);
	let tailwind_config_contents = RemixAssets::get("tailwind.config.js").unwrap();
	let index_css_contents = RemixAssets::get("index.css").unwrap();
	// Make the two config files that we need
	File::create(current_working_directory.join("tailwind.config.js")).expect("Failed to create a tailwind config file. Please try again!");
	File::create(current_working_directory.join("app/index.css")).expect("Failed to create the css entrypoint file. Please try again!");
	// Write the contents of the config files
	write("tailwind.config.js", std::str::from_utf8(tailwind_config_contents.data.as_ref()).unwrap())
		.expect("Could not write to tailwind config file!");
	write("app/index.css", std::str::from_utf8(index_css_contents.data.as_ref()).unwrap()).expect("Could not write to index.css file!");

	// Sleep a little to show loading animation, etc (there is a nice one we could use from the "tui" crate)
	let timeout = time::Duration::from_millis(500);
	thread::sleep(timeout);

	println!(
		"{} {} {} {}",
		format!("{}", rapid_logo()).bold(),
		"Success".bg_blue().color(Color::White).bold(),
		BOLT_EMOJI,
		"Rapid-ui has been initialized in your Remix project!"
	);
}
