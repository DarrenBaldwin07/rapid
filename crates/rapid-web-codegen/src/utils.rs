use regex::Regex;
use std::{
	fs,
	fs::File,
	io::Read,
	path::{Path, PathBuf},
};
use syn::{parse_str, File as SynFile, Item};

pub fn get_all_dirs(path: &str, path_array: &mut Vec<PathBuf>) {
	let dir = fs::read_dir(path);
	match dir {
		Ok(d) => {
			for entry in d {
				if let Ok(entry) = entry {
					let path = entry.path();
					if path.is_dir() {
						path_array.push(path.clone());
						get_all_dirs(path.to_str().unwrap(), path_array);
					}
				}
			}
		}
		Err(e) => {
			panic!("Error: {:?}", e);
		}
	}
}

pub fn get_all_middleware(current_path: &str, route_root: &str, path_array: &mut Vec<PathBuf>) {
	let dir = fs::read_dir(current_path);

	match dir {
		Ok(directories) => {
			for directory in directories {
				if let Ok(parsed_path) = directory {
					let path = parsed_path.path();
					let file_name = path.file_name().unwrap();

					if file_name == "_middleware.rs" {
						let mut file = File::open(&path).unwrap();
						let mut file_contents = String::new();
						file.read_to_string(&mut file_contents).unwrap();

						// We only want to add a middleware path if it is valid
						// TODO: when we implement support for "wrap_fn()" this will need tweaked (we will likely do)
						if file_contents.contains("pub struct Middleware") {
							path_array.push(path.parent().unwrap().to_path_buf());
						}

						let parent = path.parent();
						// Make sure there is actually a valid parent dir before proceeding
						if let Some(par) = parent {
							// Check to make sure that we have not reached the parent max (make sure to trigger an exit if we have)
							if par.to_str().unwrap() == route_root {
								break;
							}
							// Recursively call this function until we reach the max parent
							get_all_middleware(par.parent().unwrap().to_str().unwrap(), route_root, path_array);
						}
					}
				}
			}
		}
		Err(e) => {
			panic!("Error: {:?}", e);
		}
	}
}

pub fn base_file_name(path: &Path, base_path: &str) -> String {
	let formatted_path = path.to_str().unwrap().replace(base_path, "");

	formatted_path
}

pub fn parse_handler_path(file_name: &str) -> String {
	let dynamic_route_regex = Regex::new(r"\{[^\{\}]*\}").unwrap();

	let is_dynamic_route = dynamic_route_regex.is_match(&file_name);

	let parsed_name = match is_dynamic_route {
		true => file_name.replacen("{", "_", 1).replacen("}", "_", 1),
		false => file_name.to_string(),
	};

	parsed_name
}

pub fn parse_route_path(route_path: String) -> String {
	let dynamic_route_path_regex = Regex::new(r"_.*?_").unwrap();

	let mut captures: Vec<String> = Vec::new();

	let mut new_route_path = route_path;

	for pattern_match in dynamic_route_path_regex.captures_iter(&new_route_path) {
		let capture = pattern_match[0].to_string();
		captures.push(capture);
	}

	for path_string in captures {
		let parsed_path_string = path_string.replacen("_", "{", 1).replacen("_", "}", 1);
		new_route_path = new_route_path.replace(&path_string, &parsed_path_string);
	}

	new_route_path
}

pub fn reverse_route_path(route_path: String) -> String {
	let dynamic_route_path_regex = Regex::new(r"\{[^\{\}]*\}").unwrap();

	let mut captures: Vec<String> = Vec::new();

	let mut new_route_path = route_path;

	for pattern_match in dynamic_route_path_regex.captures_iter(&new_route_path) {
		let capture = pattern_match[0].to_string();
		captures.push(capture);
	}

	for path_string in captures {
		let parsed_path_string = path_string.replacen("{", "_", 1).replacen("}", "_", 1);
		new_route_path = new_route_path.replace(&path_string, &parsed_path_string);
	}

	new_route_path
}

// TODO: this is a clone from the rapid-web crate utils (at some point we need a rapid-utils crate)
/// Method for checking if a handler function is valid
/// Handlers are only valid if they have a "#[rapid_handler]" macro on them
pub fn is_valid_handler(macro_name: &str, attributes: Vec<syn::Attribute>) -> bool {
	attributes
		.iter()
		.any(|attr| attr.path().segments.iter().any(|segment| segment.ident == macro_name))
}

/// Helper function for checking if a rapid route file is valid
/// We need this so that we can generate actix-web routes for only valid route files
pub fn validate_route_handler(handler_source: &String) -> bool {
	let parsed_file: SynFile =
		parse_str(handler_source.as_str()).expect("An error occurred when attempting to parse a rapid route handler with the 'syn' rust crate ()");

	// We define a valid route as having a rapid handler macro and it only containing one handler function
	// Rapid will ignore all files that have more than one handler
	let mut has_rapid_handler = false;
	let mut handler_count = 0;

	for item in parsed_file.items {
		if let Item::Fn(function) = item {
			let is_valid = is_valid_handler("rapid_handler", function.attrs);
			has_rapid_handler = is_valid;
			if is_valid {
				handler_count += 1;
			}
		}
	}

	has_rapid_handler && handler_count == 1
}
