use rapid_cli::cli::{CliError, Config, RapidCLI};
use colorful::{Color, Colorful};
use std::io::Write;

fn main() -> Result<(), CliError<'static>> {
	pretty_env_logger::formatted_builder()
	.filter_level(log::LevelFilter::Info)
	.filter(Some("actix_server"), log::LevelFilter::Error)
	.format(|buf, record| {
		writeln!(buf, "{}: {}", record.level().to_string().color(Color::Cyan), record.args())
	})
	.try_init().ok();

	// TODO: eventually, the user will be able to persist settings via a global config file
	// and all those settings will be loaded in and passed to this object (ex: rapid configure or rapid auth)
	let app = RapidCLI::new(Config {});
	let args = RapidCLI::parse().get_matches();
	app.run(args)
}
