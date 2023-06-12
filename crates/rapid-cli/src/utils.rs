pub mod logos {
	use crate::constants::LOGO;
	use tiny_gradient::{GradientDisplay, GradientStr, RGB};

	/// Logo with signs
	pub fn rapid_logo<'a>() -> GradientDisplay<'a, [RGB; 4]> {
		GradientStr::gradient(
			&">>> R A P I D",
			[RGB::new(9, 42, 208), RGB::new(26, 78, 96), RGB::new(9, 42, 208), RGB::new(14, 197, 255)],
		)
	}

	/// Normal Logo
	pub fn rapid_logo_small<'a>() -> GradientDisplay<'a, [RGB; 4]> {
		GradientStr::gradient(
			&"R A P I D",
			[RGB::new(9, 42, 208), RGB::new(26, 78, 96), RGB::new(9, 42, 208), RGB::new(14, 197, 255)],
		)
	}

	/// Large Ascii printed logo
	pub fn logo<'a>() -> GradientDisplay<'a, [RGB; 4]> {
		GradientStr::gradient(
			&LOGO,
			[RGB::new(9, 42, 208), RGB::new(26, 78, 96), RGB::new(9, 42, 208), RGB::new(14, 197, 255)],
		)
	}
}

pub mod paths {
	use std::env::{current_dir, current_exe};
	use std::path::PathBuf;
	/// Returns what the current working directory of the user is
	pub fn current_directory() -> PathBuf {
		current_dir().expect("Error: Could not determine the current working directory")
	}

	/// Returns where the installed binary is on the users machine
	pub fn binary_dir() -> PathBuf {
		current_exe().expect("Error: Could not determine binary dir.")
	}
}
