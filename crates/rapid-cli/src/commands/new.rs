use super::RapidCommand;
use crate::{
	cli::{current_directory, logo, rapid_logo, Config},
	constants::BOLT_EMOJI,
	tui::clean_console,
};
use clap::{arg, value_parser, ArgAction, ArgMatches, Command};
use colorful::{Color, Colorful};
use include_dir::{include_dir, Dir};
use requestty::{prompt_one, Question};
use std::{
	fs::remove_dir_all,
	path::PathBuf,
	process::{exit, Command as StdCommand},
	thread, time,
};

// We need to get the project directory to extract the template files (this is because include_dir!() is yoinked inside of a workspace)
const PROJECT_DIR: Dir<'_> = include_dir!("$CARGO_MANIFEST_DIR/src/templates/server");

pub struct New {}

impl RapidCommand for New {
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
		parse_new_args(args);
		Ok(())
	}
}

pub fn parse_new_args(args: &ArgMatches) {
	/// NOTE: We can add more args for templates here (ideally we add nextjs asap)
	const NEW_ARGS: [&str; 2] = ["fullstack", "server"];
	// Get the current working directory of the user
	let current_working_directory = current_directory();

	// We want to check if the user did in fact input a valid application type ("fullstack" or "server")
	// This handles the case when "rapid new" is ran with no inputs
	let mut did_find_match = false;

	for arg in NEW_ARGS {
		match args.get_one::<PathBuf>(arg) {
			Some(val) => {
				if val == &PathBuf::from("true") {
					match arg {
						"fullstack" => {
							init_fullstack_template(current_working_directory, arg);
							did_find_match = true;
							break;
						}
						"server" => {
							init_server_template(current_working_directory, arg);
							did_find_match = true;
							break;
						}
						_ => {
							// If we got valid args but none of them actually matched on one of
							// our support application types, we want to show the user an error message
							println!(
								"{}",
								"No application type detected. Please use either --server or --fullstack".color(Color::Red)
							);
							break;
						}
					}
				}
			}
			None => {
				println!(
					"{}",
					"No application type detected. Please use either --server or --fullstack".color(Color::Red)
				);
				break;
			}
		}
	}

	// Check if we found a app type match
	// If we did not than we want to show a log to the user
	if !did_find_match {
		println!(
			"{}",
			"No application type detected. Please use either --server or --fullstack".color(Color::Red)
		);
	}
}

// TODO: scaffold a new remix + rapid app as the default fullstack app (we will then support nextjs, etc)
pub fn init_fullstack_template(current_working_directory: PathBuf, arg: &str) {
	println!("Coming soon...");
}

pub fn init_server_template(current_working_directory: PathBuf, _: &str) {
	// Ask the user what they want to name their project
	let project_name = prompt_one(
		Question::input("project_name")
			.message("What will your project be called?")
			.default("my-app")
			.build(),
	)
	.expect("Error: Could not scaffold project. Please try again!");

	let project_name = project_name.as_string().unwrap();

	// Validate that the project name does not contain any invalid chars
	if !project_name.chars().all(|x| x.is_alphanumeric() || x == '-' || x == '_') {
		println!("Aborting...your project name may only contain alphanumeric characters along with '-' and '_'...");
		exit(64);
	}

	let path = current_working_directory.join(project_name);

	// Check if the path already exists (if it does we want to ask the user if they want to delete it)
	if path.exists() {
		let force = prompt_one(
			Question::confirm("force_delete")
				.message("Your specified directory is not empty and has files currently in it, do you want to overwrite?")
				.default(false)
				.build(),
		)
		.expect("Error: Could not scaffold project. Please try again!");

		match !force.as_bool().unwrap() {
			true => {
				exit(64);
			}
			false => {
				remove_dir_all(&path).expect("Error: Could not scaffold project. The specified directory must be empty. Please try again!");
			}
		}
	}

	// Run the cargo commands
	StdCommand::new("sh")
		.current_dir(current_directory())
		.arg("-c")
		.arg(format!("cargo new {} --quiet", project_name))
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not scaffold project. Please try again!");

	StdCommand::new("sh")
		.current_dir(current_directory().join(project_name))
		.arg("-c")
		.arg("cargo add rapid-web rapid-web-codegen futures-util include_dir --quiet")
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not scaffold project. Please try again!");

	// Remove the default src directory
	remove_dir_all(current_working_directory.join(format!("{}/src", project_name))).unwrap();

	// Replace the default source dir with our own template files
	PROJECT_DIR.extract(current_working_directory.join(project_name).clone()).unwrap();

	println!("{}", "\nInitializing a new rapid-web server application...".color(Color::LightCyan));

	// Sleep a little to show loading animation, etc (there is a nice one we could use from the "tui" crate)
	let timeout = time::Duration::from_millis(675);
	thread::sleep(timeout);

	clean_console();

	println!(
		"\n\n{} {} {} {}",
		format!("{}", rapid_logo()).bold(),
		"Success".bg_blue().color(Color::White).bold(),
		BOLT_EMOJI,
		"Welcome to your new rapid-web server application!"
	);

	println!(
		"{} {} {} {} {}",
		"\n\n🚀".bold(),
		"Next Steps".bg_blue().color(Color::White).bold(),
		BOLT_EMOJI,
		format!("\n\ncd {}", project_name).bold(),
		"\nrapid run".bold()
	);
}
