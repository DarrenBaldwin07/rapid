use clap::{Arg, ArgAction};

pub fn flag(name: &'static str, help: &'static str) -> Arg {
	Arg::new(name).long(name).help(help).action(ArgAction::SetTrue)
}
