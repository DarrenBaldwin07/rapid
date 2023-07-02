use crate::constants::LOGO;
use tiny_gradient::{GradientDisplay, GradientStr, RGB};

/// Clears the console when called
pub fn clean_console() {
	print!("{esc}c", esc = 27 as char);
}

/// Helper function for printing indentations to the console
pub fn indent(amount: u32) -> String {
	let mut new_amount = String::new();

	for _ in 0..amount {
		new_amount.push('\n');
	}
	new_amount
}


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
