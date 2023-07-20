use super::RapidCommand;
use crate::{
	cli::{current_directory, Config},
	constants::BOLT_EMOJI,
	tui::{clean_console, indent, logo, rapid_logo},
};
use clap::{arg, Arg, ArgAction, ArgMatches, Command};
use colorful::{Color, Colorful};
use include_dir::{include_dir, Dir};
use requestty::{prompt, prompt_one, Answer, Question};
use spinach::Spinach;
use std::{
	fs::remove_dir_all,
	path::PathBuf,
	process::{exit, Command as StdCommand},
	thread, time,
};

// We need to get the project directory to extract the template files (this is because include_dir!() is yoinked inside of a workspace)
static PROJECT_DIR: Dir<'_> = include_dir!("$CARGO_MANIFEST_DIR/templates/server");
static REMIX_DIR: Dir<'_> = include_dir!("$CARGO_MANIFEST_DIR/templates/remix");
static NEXTJS_DIR: Dir<'_> = include_dir!("$CARGO_MANIFEST_DIR/templates/nextjs");
static REMIX_WITHOUT_CLERK_DIR: Dir<'_> = include_dir!("$CARGO_MANIFEST_DIR/templates/remix-without-clerk");

pub struct New {}

impl RapidCommand for New {
	fn cmd() -> clap::Command {
		Command::new("new")
			.about("Creates a new Rapid project at the current working directory!")
			.arg(
				Arg::new("remix")
					.long("remix")
					.required(false)
					.conflicts_with("nextjs")
					.conflicts_with("server")
					.action(ArgAction::SetTrue)
					.value_name("REMIX")
					.help("Scaffolds a fullstack Rapid project with remix!"),
			)
			.arg(
				Arg::new("nextjs")
					.long("nextjs")
					.required(false)
					.conflicts_with("server")
					.conflicts_with("remix")
					.action(ArgAction::SetTrue)
					.value_name("NEXTJS")
					.help("Scaffolds a fullstack Rapid project with Nextjs!"),
			)
			.arg(
				Arg::new("server")
					.long("server")
					.required(false)
					.conflicts_with("nextjs")
					.conflicts_with("remix")
					.action(ArgAction::SetTrue)
					.value_name("SERVER")
					.help("Scaffolds a server-side only Rapid project!"),
			)
	}

	fn execute(_: &Config, args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
		println!("{}", logo());
		parse_new_args(args);
		Ok(())
	}
}

pub fn parse_new_args(args: &ArgMatches) {
	// Get the current working directory of the user
	let current_working_directory = current_directory();

	let is_remix = args.get_one::<bool>("remix").unwrap_or(&true);
	let is_server = args.get_one::<bool>("server").unwrap_or(&false);
	let is_nextjs = args.get_one::<bool>("nextjs").unwrap_or(&false);

	match (is_remix, is_server, is_nextjs) {
		(false, false, true) => {
			init_nextjs_template(current_working_directory);
		}
		(true, false, false) => {
			init_remix_template(current_working_directory);
		}
		(false, true, false) => {
			init_server_template(current_working_directory, "server");
		}
		(false, false, false) => {
			init_remix_template(current_working_directory);
		}
		_ => unreachable!(),
	}
}

// TODO: scaffold a new remix + rapid app as the default fullstack app (we will then support nextjs, etc)
pub fn init_remix_template(current_working_directory: PathBuf) {
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

	// Before we initialize the project, lets ask the user to specify which package manager they want to use and then run the install process with that package manager
	let manager_choices = vec!["pnpm", "npm", "yarn"];

	println!("{}", indent(1));

	let package_manager = requestty::Question::select("packageManagerSelect")
		.message("Which package manager would you like to use?:")
		.choices(manager_choices)
		.page_size(6)
		.build();

	let package_manager = prompt(vec![package_manager]).expect("Error: Could not scaffold project. Please try again!");

	let package_manager = match package_manager.get("packageManagerSelect") {
		Some(Answer::ListItem(choice)) => choice.text.clone(),
		_ => {
			println!(
				"{}",
				"Aborting...an error occurred while trying to parse package manager selection. Please try again!"
					.bold()
					.color(Color::Red)
			);
			exit(64);
		}
	};

	println!("{}", indent(1));

	// Have the user select from a list of technologies they might or might not want to use
	// TODO: use this when we actually have more choices (like prettier, eslint, rapid-ui, diesel, sea-orm, sqlx, etc)
	let _ = vec!["Clerk (authentication)"];

	let tech_choices =
		requestty::Question::multi_select("What technologies would you like included?").choice_with_default("Clerk (authentication)", true);

	let tech_choices = prompt_one(tech_choices).expect("Error: Could not scaffold project. Please try again!");

	let tech_choices = match tech_choices {
		Answer::ListItems(choices) => choices,
		_ => {
			println!(
				"{}",
				"Aborting...an error occurred while trying to parse technology choices. Please try again!"
					.bold()
					.color(Color::Red)
			);
			exit(64);
		}
	};

	let should_include_clerk = tech_choices.iter().any(|x| x.text == "Clerk (authentication)");

	println!("{}", indent(1));

	let loading = Spinach::new(format!("{}", "Initializing a new Rapid Remix application..".color(Color::LightCyan)));

	// Run the scaffold commands
	StdCommand::new("sh")
		.current_dir(current_directory())
		.arg("-c")
		.arg(format!("mkdir {}", project_name))
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not scaffold project. Please try again!");

	// Initialize a git repo
	StdCommand::new("sh")
		.current_dir(current_directory().join(project_name))
		.arg("-c")
		.arg(format!("git init --quiet"))
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not scaffold project. Please try again!");

	// Replace the default source dir with our own template files
	if !should_include_clerk {
		REMIX_WITHOUT_CLERK_DIR
			.extract(current_working_directory.join(project_name).clone())
			.unwrap();
	} else {
		REMIX_DIR.extract(current_working_directory.join(project_name).clone()).unwrap();
	}

	// Rename cargo.toml file (We have to set it to Cargo__toml due to a random bug with cargo publish command in a workspace)
	StdCommand::new("sh")
		.current_dir(current_directory().join(project_name))
		.arg("-c")
		.arg(format!("mv Cargo__toml Cargo.toml"))
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not scaffold project. Please try again!");

	// Sleep a little to show loading animation, etc (there is a nice one we could use from the "tui" crate)
	let timeout = time::Duration::from_millis(1000);
	thread::sleep(timeout);

	// stop showing the loader
	loading.succeed("Initialized!");

	// Take the package manager and run the install command
	let loading = Spinach::new(format!("{}", "Installing dependencies...".color(Color::LightCyan)));

	StdCommand::new("sh")
		.current_dir(current_directory().join(project_name))
		.arg("-c")
		.arg(format!("{} install > /dev/null 2>&1", package_manager))
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not install project dependencies!");

	loading.succeed("Installed dependencies!");

	clean_console();

	println!(
		"\n\n{} {} {} {}",
		format!("{}", rapid_logo()).bold(),
		"Success".bg_blue().color(Color::White).bold(),
		BOLT_EMOJI,
		"Welcome to your new Rapid application with Remix!"
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

	println!("{}", indent(1));

	let loading = Spinach::new(format!("{}", "Initializing a new Rapid server application..".color(Color::LightCyan)));

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
		.arg("cargo add rapid-web futures-util include_dir --quiet")
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not scaffold project. Please try again!");

	// Remove the default src directory
	remove_dir_all(current_working_directory.join(format!("{}/src", project_name))).unwrap();

	// Replace the default source dir with our own template files
	PROJECT_DIR.extract(current_working_directory.join(project_name).clone()).unwrap();

	// Sleep a little to show loading animation, etc (there is a nice one we could use from the "tui" crate)
	let timeout = time::Duration::from_millis(675);
	thread::sleep(timeout);

	// Stop our loading spinner
	loading.stop();

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


pub fn init_nextjs_template(current_working_directory: PathBuf) {
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

	// Before we initialize the project, lets ask the user to specify which package manager they want to use and then run the install process with that package manager
	let manager_choices = vec!["pnpm", "npm", "yarn"];

	println!("{}", indent(1));

	let package_manager = requestty::Question::select("packageManagerSelect")
		.message("Which package manager would you like to use?:")
		.choices(manager_choices)
		.page_size(6)
		.build();

	let package_manager = prompt(vec![package_manager]).expect("Error: Could not scaffold project. Please try again!");

	let package_manager = match package_manager.get("packageManagerSelect") {
		Some(Answer::ListItem(choice)) => choice.text.clone(),
		_ => {
			println!(
				"{}",
				"Aborting...an error occurred while trying to parse package manager selection. Please try again!"
					.bold()
					.color(Color::Red)
			);
			exit(64);
		}
	};

	println!("{}", indent(1));

	let loading = Spinach::new(format!("{}", "Initializing a new Rapid Nextjs application..".color(Color::LightCyan)));

	// Run the scaffold commands
	StdCommand::new("sh")
		.current_dir(current_directory())
		.arg("-c")
		.arg(format!("mkdir {}", project_name))
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not scaffold project. Please try again!");

	// Initialize a git repo
	StdCommand::new("sh")
		.current_dir(current_directory().join(project_name))
		.arg("-c")
		.arg(format!("git init --quiet"))
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not scaffold project. Please try again!");

	// Replace the default source dir with our own template files
	NEXTJS_DIR.extract(current_working_directory.join(project_name).clone()).unwrap();

	// Rename cargo.toml file (We have to set it to Cargo__toml due to a random bug with cargo publish command in a workspace)
	StdCommand::new("sh")
		.current_dir(current_directory().join(project_name))
		.arg("-c")
		.arg(format!("mv Cargo__toml Cargo.toml"))
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not scaffold project. Please try again!");

	// Sleep a little to show loading animation, etc (there is a nice one we could use from the "tui" crate)
	let timeout = time::Duration::from_millis(1000);
	thread::sleep(timeout);

	// stop showing the loader
	loading.succeed("Initialized!");

	// Take the package manager and run the install command
	let loading = Spinach::new(format!("{}", "Installing dependencies...".color(Color::LightCyan)));

	StdCommand::new("sh")
		.current_dir(current_directory().join(project_name))
		.arg("-c")
		.arg(format!("{} install > /dev/null 2>&1", package_manager))
		.spawn()
		.unwrap()
		.wait()
		.expect("Error: Could not install project dependencies!");

	loading.succeed("Installed dependencies!");

	clean_console();

	println!(
		"\n\n{} {} {} {}",
		format!("{}", rapid_logo()).bold(),
		"Success".bg_blue().color(Color::White).bold(),
		BOLT_EMOJI,
		"Welcome to your new Rapid application with Nextjs!"
	);

	println!(
		"{} {} {} {} {} {}",
		"\n\n🚀".bold(),
		"Next Steps".bg_blue().color(Color::White).bold(),
		BOLT_EMOJI,
		format!("\n\ncd {}", project_name).bold(),
		"\nrapid run".bold(),
		format!("\n{} run dev", package_manager).bold()
	);
}
