pub fn clean_console() {
	print!("{esc}c", esc = 27 as char);
}

pub fn indent(amount: u32) -> String {
	let mut new_amount = String::new();

	for _ in 0..amount {
		new_amount.push('\n');
	}
	new_amount
}
