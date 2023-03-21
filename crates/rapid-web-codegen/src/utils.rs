use std::{fs, path::{PathBuf, Path}};

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

pub fn base_file_name(path: &Path, base_path: &str) -> String {
    let formatted_path = path.to_str().unwrap().replace(base_path, "");

    formatted_path
}

