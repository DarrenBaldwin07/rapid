use crate::constants::LOGO;
use tiny_gradient::{GradientDisplay, GradientStr, RGB};

/// Clears the console when called
pub fn clean_console() {
	print!("{esc}c", esc = 27 as char);
}

pub fn chevrons<'a>() -> GradientDisplay<'a, [RGB; 3]> {
	GradientStr::gradient(
		&">>>",
		[RGB::new(9, 42, 208), RGB::new(26, 78, 96), RGB::new(9, 42, 208)],
	)
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
pub fn rapid_logo<'a>() -> &'static str {
	// GradientStr::gradient(
	// 	&">>> R A P I D",
	// 	[RGB::new(9, 42, 208), RGB::new(26, 78, 96), RGB::new(9, 42, 208), RGB::new(14, 197, 255)],
	// )
	// precomputed string of above gradient
	// this allows the use in Spinach spinners
	"\x1b[38;2;9;42;208m>\x1b[0m\x1b[38;2;15;55;175m>\x1b[0m\x1b[38;2;20;65;140m>\x1b[0m\x1b[38;2;26;78;96m \x1b[0m\x1b[38;2;21;68;130mR\x1b[0m\x1b[38;2;17;60;158m \x1b[0m\x1b[38;2;14;52;184mA\x1b[0m\x1b[38;2;9;42;208m \x1b[0m\x1b[38;2;9;99;215mP\x1b[0m\x1b[38;2;10;130;223m \x1b[0m\x1b[38;2;11;155;233mI\x1b[0m\x1b[38;2;12;177;244m \x1b[0m\x1b[38;2;14;197;255mD\x1b[0m"
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
