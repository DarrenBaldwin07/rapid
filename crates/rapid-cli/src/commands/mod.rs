pub mod init;
pub mod new;
pub mod run;
pub mod templates;

use clap::Subcommand;
use init::InitArgs;
use new::NewArgs;
use run::RunArgs;
use templates::TemplatesArgs;

#[derive(Subcommand, Debug)]
/// Get started with Rapid! Generate templates and run your app!
pub enum RapidCommand {
	Init(InitArgs),
	Run(RunArgs),
	Templates(TemplatesArgs),
	New(NewArgs),
}
