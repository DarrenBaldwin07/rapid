pub fn clean_console() {
	print!("{esc}c", esc = 27 as char);
}
