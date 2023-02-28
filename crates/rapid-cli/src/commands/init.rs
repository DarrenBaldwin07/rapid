use clap::{Command, ArgAction, ArgMatches, arg, value_parser};
use std::path::PathBuf;
use std::fs::{write, File};
use std::{thread, time};
use std::env::{current_exe, current_dir};
use crate::cli::{Config, rapid_logo, logo};
use crate::constants::BOLT_EMOJI;
use super::RapidCommand;
use colorful::Color;
use colorful::Colorful;
use rust_embed::RustEmbed;

#[derive(RustEmbed)]
#[folder = "src/templates/rapidUI/reactVite/"]
struct Asset;

#[derive(RustEmbed)]
#[folder = "src/templates/rapidUI/remix/"]
struct RemixAssets;

pub struct Init {}

impl RapidCommand for  Init {
    fn cmd() -> clap::Command {
        Command::new("init")
        .about("A command for initializing Rapid libraries in your projects!")
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
        )
    }

    fn execute(_: &Config, args: &ArgMatches) -> Result<(), crate::cli::CliError<'static>> {
        println!("{}", logo());
        parse_init_args(args);
        Ok(())
    }
}


fn parse_init_args(args: &ArgMatches) {
    /// NOTE: We can add more args for templates here (ideally we add nextjs asap)
    const INIT_ARGS: [&str; 2] = ["vite", "remix"];
    // Get the install directory of the rapid-cli
    let binary_dir = current_dir().unwrap();

    for arg in INIT_ARGS {
        match args.get_one::<PathBuf>(arg) {
            Some(val) => {
                if val == &PathBuf::from("true") {
                    match arg {
                        "vite" => {
                            init_vite_template(binary_dir, arg);
                            break;
                        }
                        "remix" => {
                            init_remix_template(binary_dir, arg);
                            break;
                        }
                        _ => {
                            println!("{} {}", "No template found. Please try '--vite' or '--remix'".color(Color::Red), arg);
                            break;
                        }
                    }
                }

            }
            None => {
                println!("{} {}", "No template found. Please try '--vite' or '--remix'".color(Color::Red), arg);
            }
        }
    }
}


pub fn init_vite_template(binary_dir: PathBuf, arg: &str) {
    println!("{} {:?}...", "Initializing rapid-ui with the template".color(Color::Green), arg);
    let tailwind_config_contents = Asset::get("tailwind.config.js").unwrap();
    let postcss_config_contents = Asset::get("postcss.config.js").unwrap();
    let index_css_contents = Asset::get("index.css").unwrap();
    // Make the two config files that we need
    File::create(binary_dir.join("tailwind.config.js")).unwrap();
    File::create(binary_dir.join("postcss.config.js")).unwrap();
    File::create(binary_dir.join("src/index.css")).unwrap();
    // Write the contents of the config files
    write("tailwind.config.js", std::str::from_utf8(tailwind_config_contents.data.as_ref()).unwrap()).expect("Could not write to tailwind config file!");
    write("postcss.config.js", std::str::from_utf8(postcss_config_contents.data.as_ref()).unwrap()).expect("Could not write to postcss config file!");
    write("src/index.css", std::str::from_utf8(index_css_contents.data.as_ref()).unwrap()).expect("Could not write to index.css file!");

    // Sleep a little to show loading animation, etc (there is a nice one we could use from the "tui" crate)
    let timeout = time::Duration::from_millis(500);
    thread::sleep(timeout);

    println!("{} {} {} {}", format!("{}", rapid_logo()).bold(), "Success".bg_blue().color(Color::White).bold(), BOLT_EMOJI, "Rapid-ui has been initialized in your Vite project!");
}

pub fn init_remix_template(binary_dir: PathBuf, arg: &str) {
    println!("{} {:?}...", "Initializing rapid-ui with the template".color(Color::Green), arg);
    let tailwind_config_contents = RemixAssets::get("tailwind.config.js").unwrap();
    let index_css_contents = RemixAssets::get("index.css").unwrap();
    // Make the two config files that we need
    File::create(binary_dir.join("tailwind.config.js")).unwrap();
    File::create(binary_dir.join("app/index.css")).unwrap();
    // Write the contents of the config files
    write("tailwind.config.js", std::str::from_utf8(tailwind_config_contents.data.as_ref()).unwrap()).expect("Could not write to tailwind config file!");
    write("app/index.css", std::str::from_utf8(index_css_contents.data.as_ref()).unwrap()).expect("Could not write to index.css file!");

    // Sleep a little to show loading animation, etc (there is a nice one we could use from the "tui" crate)
    let timeout = time::Duration::from_millis(500);
    thread::sleep(timeout);

    println!("{} {} {} {}", format!("{}", rapid_logo()).bold(), "Success".bg_blue().color(Color::White).bold(), BOLT_EMOJI, "Rapid-ui has been initialized in your Remix project!");
}
