use std::{fs, path::{PathBuf, Path}};
use std::fs::File;
use std::io::Read;

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
