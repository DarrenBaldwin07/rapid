use crate::cli::Framework;
use crate::utils::logos::{logo, rapid_logo};
use crate::{constants::BOLT_EMOJI, utils::paths::current_directory};
use clap::{Args, Subcommand};
use colorful::{Color, Colorful};
use rust_embed::RustEmbed;
use std::{
	fs::{write, File},
	thread, time,
};

#[derive(RustEmbed)]
#[folder = "templates/rapidUI/reactVite/"]
struct Asset;

#[derive(RustEmbed)]
#[folder = "templates/rapidUI/remix/"]
struct RemixAssets;

#[derive(RustEmbed)]
#[folder = "templates/rapidUI/nextjs/"]
struct NextJsAssets;

#[derive(RustEmbed)]
#[folder = "templates/dockerfiles/"]
struct Dockerfiles;

#[derive(Subcommand, Debug)]
pub enum InitSubCommand {
	/// Initialize Rapid server
	Server {
		#[arg(long)]
		/// Generate Dockerfile(s) for server deployment
		deploy: bool,
	},
	/// Initialize Rapid UI
	Ui {
		#[arg(value_enum)]
		/// The framework your project uses
		framework: Framework,
	},
	/// Initialize Rapid fullstack (server + UI)
	Fullstack {
		#[arg(value_enum)]
		/// The framework your project uses
		framework: Framework,
	},
}

#[derive(Args, Debug)]
/// Initialize Rapid libraries in your existing projects!
pub struct InitArgs {
	#[command(subcommand)]
	subcommand: InitSubCommand,
}

/// Execute the init command
pub fn execute(args: &InitArgs) -> () {
	println!("{}", logo());
	match &args.subcommand {
		InitSubCommand::Ui { framework } => ui_subcommand_handler(&framework),
		InitSubCommand::Server { deploy } => server_subcommand_handler(&deploy),
		// TODO: Implement rapid init fullstack
		InitSubCommand::Fullstack { framework: _ } => todo!(),
	}
}

fn ui_subcommand_handler(framework: &Framework) {
	use Framework::*;
	match framework {
		Vite => init_vite_template(),
		Remix => init_remix_template(),
		Nextjs => init_nextjs_template(),
	}
}

fn server_subcommand_handler(deploy: &bool) {
	if *deploy {
		init_deployments_dockerfile()
	};
	// TODO: Fully Implement rapid init server
	todo!()
}

fn init_vite_template() {
	let current_working_directory = current_directory();
	println!("{} {:?}...", "Initializing rapid-ui with the template".color(Color::Green), "vite");
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

fn init_remix_template() {
	let current_working_directory = current_directory();
	println!("{} {:?}...", "Initializing rapid-ui with the template".color(Color::Green), "remix");
	let tailwind_config_contents = RemixAssets::get("tailwind.config.ts").unwrap();
	let index_css_contents = RemixAssets::get("index.css").unwrap();
	// Make the two config files that we need
	File::create(current_working_directory.join("tailwind.config.ts")).expect("Failed to create a tailwind config file. Please try again!");
	File::create(current_working_directory.join("app/index.css")).expect("Failed to create the css entrypoint file. Please try again!");
	// Write the contents of the config files
	write("tailwind.config.ts", std::str::from_utf8(tailwind_config_contents.data.as_ref()).unwrap())
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

fn init_nextjs_template() {
	let current_working_directory = current_directory();
	println!("{} {:?}...", "Initializing rapid-ui with the template".color(Color::Green), "nextjs");
	let tailwind_config_contents = NextJsAssets::get("tailwind.config.ts").unwrap();
	let postcss_config_contents = NextJsAssets::get("postcss.config.js").unwrap();

	// Make the two config files that we need
	File::create(current_working_directory.join("tailwind.config.ts")).expect("Failed to create a tailwind config file. Please try again!");
	// Create our postcss file
	write("postcss.config.js", std::str::from_utf8(postcss_config_contents.data.as_ref()).unwrap()).expect("Could not write to postcss config file!");
	// Write the contents of the config files
	write("tailwind.config.ts", std::str::from_utf8(tailwind_config_contents.data.as_ref()).unwrap())
		.expect("Could not write to tailwind config file!");

	// Sleep a little to show loading animation, etc (there is a nice one we could use from the "tui" crate)
	let timeout = time::Duration::from_millis(500);
	thread::sleep(timeout);

	println!(
		"{} {} {} {}",
		format!("{}", rapid_logo()).bold(),
		"Success".bg_blue().color(Color::White).bold(),
		BOLT_EMOJI,
		"Rapid-ui has been initialized in your NextJS project!"
	);
}

fn init_deployments_dockerfile() {
	let current_working_directory = current_directory();
	println!("{}...", "Initializing rapid deployments".color(Color::Green));
	let dockerfile_conents = Dockerfiles::get("rapidServer.Dockerfile").unwrap();

	// Create the Dockerfile
	File::create(current_working_directory.join("rapid.Dockerfile"))
		.expect("Failed to create the depoyment Dockerfile. Is there already a dockerfile created with the name 'rapid.Dockerfile'?");

	// Write to the Dockerfuke
	write("rapid.Dockerfile", std::str::from_utf8(dockerfile_conents.data.as_ref()).unwrap()).expect("Could not write to postcss config file!");

	// Sleep a little to show loading animation, etc (there is a nice one we could use from the "tui" crate)
	let timeout = time::Duration::from_millis(500);
	thread::sleep(timeout);

	println!(
		"{} {} {} {} {}",
		"\n\n🚀".bold(),
		"Next Steps".bg_blue().color(Color::White).bold(),
		BOLT_EMOJI,
		format!(
			"{}{}",
			format!("\n\nBuild: {}", "").bold(),
			"docker build -t rapid-server -f ./rapid.Dockerfile .".color(Color::LightCyan)
		),
		format!(
			"{}{}",
			format!("\nRun: {}", "").bold(),
			"docker run -p 8080:8080 rapid-server".color(Color::LightCyan)
		),
	);
}
