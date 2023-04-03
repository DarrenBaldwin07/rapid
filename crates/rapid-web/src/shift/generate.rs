use super::{
	convert::{convert_primitive, TypescriptType},
	util::{extract_handler_types, space, HandlerRequestType, TypeClass},
};
use std::{
	fs::{File, OpenOptions},
	io::prelude::*,
	path::PathBuf,
};
use walkdir::WalkDir;

#[derive(Debug)]
pub enum Handler {
	Query(TypedQueryHandler),
	Mutation(TypedMutationHandler),
}

#[derive(Debug)]
pub struct TypedQueryHandler {
	pub key: String,
	pub request_type: HandlerRequestType,
	pub path: Option<TypescriptType>,
	pub query_params: Option<TypescriptType>,
}

#[derive(Debug)]
pub struct TypedMutationHandler {
	pub key: String,
	pub request_type: HandlerRequestType,
	pub query_params: Option<TypescriptType>,
	pub path: Option<TypescriptType>,
	pub body_type: Option<TypescriptType>,
}

/// Function for generating typescript types from a rapid routes directory
pub fn generate_handler_types(routes_path: PathBuf) -> Vec<Handler> {
	let mut handlers: Vec<Handler> = Vec::new();

	let routes_dir = routes_path;

	for route_file in WalkDir::new(routes_dir) {
		let entry = match route_file {
			Ok(val) => val,
			Err(e) => panic!("An error occurred what attempting to parse directory: {}", e),
		};

		// We only want to handle route files and no directories (the walkDir crate auto iterates through nested dirs)
		if entry.path().is_dir() {
			continue;
		}

		let handler_key = entry.path().file_stem().unwrap().to_string_lossy().to_string();

		// Create a reference to the current route file and grab its contents as a string
		let mut file = File::open(&entry.path()).unwrap();
		let mut route_file_contents = String::new();
		file.read_to_string(&mut route_file_contents).unwrap();

		let handler_types = match extract_handler_types(&route_file_contents) {
			Some(val) => {
				if val.len() > 0 {
					val
				} else {
					continue;
				}
			}
			None => continue,
		};

		let mut query_params: Option<TypescriptType> = None;
		let mut body_type: Option<TypescriptType> = None;
		let mut path: Option<TypescriptType> = None;
		let request_type = handler_types[0].as_ref().unwrap().handler_type.clone();

		for typed in handler_types {
			let rust_primitive = match typed {
				Some(val) => val,
				None => continue,
			};

			let converted_type = convert_primitive(&rust_primitive.type_value);

			match rust_primitive.class {
				Some(TypeClass::InputBody) => body_type = Some(converted_type),
				Some(TypeClass::QueryParam) => query_params = Some(converted_type),
				Some(TypeClass::Path) => path = Some(converted_type),
				_ => continue,
			}
		}

		match request_type {
			HandlerRequestType::Get => {
				handlers.push(Handler::Query(TypedQueryHandler {
					key: handler_key,
					request_type,
					path,
					query_params,
				}));
			}
			_ => {
				handlers.push(Handler::Mutation(TypedMutationHandler {
					key: handler_key,
					request_type,
					query_params,
					path,
					body_type,
				}));
			}
		}
	}

	handlers
}

pub fn create_typescript_types(out_dir: PathBuf, route_dir: PathBuf) {
	let handlers = generate_handler_types(route_dir);

	// Early exit without doing anything if we did not detect any handlers
	if handlers.len() < 1 {
		return;
	}

	let mut file = OpenOptions::new()
		.write(true)
		.create(true)
		.truncate(true)
		.open(format!("{}/bindings.ts", out_dir.as_os_str().to_str().unwrap()))
		.unwrap();
	let mut queries_ts = String::from("{");
	let mut mutations_ts = String::from("{");

	for handler in handlers {
		match handler {
			Handler::Query(query) => {
				let mut ts_type = format!("\n\t\t{}: {{\n", query.key);
				let spacing = space(2);
				let request_type = match query.request_type {
					HandlerRequestType::Post => "post",
					HandlerRequestType::Put => "put",
					HandlerRequestType::Delete => "delete",
					HandlerRequestType::Get => "get",
					HandlerRequestType::Patch => "patch",
				};

				if let Some(query_params_type) = query.query_params {
					let query_params = format!("\t\t\tquery_params: {}", query_params_type.typescript_type);
					ts_type.push_str(&format!("{}{}\n", spacing, query_params));
				}

				if let Some(path_type) = query.path {
					let path = format!("\t\t\tpath: {}", path_type.typescript_type);
					ts_type.push_str(&format!("{}{}\n", spacing, path));
				}

				let request_type = format!("\t\t\ttype: '{}'", request_type);
				ts_type.push_str(&format!("{}{}\n", spacing, request_type));

				ts_type.push_str(&format!("\t\t}},\n"));

				queries_ts.push_str(&ts_type);
			}
			Handler::Mutation(mutation) => {
				let mut ts_type = format!("\n\t\t{}: {{\n", mutation.key);
				let spacing = space(2);
				let request_type = match mutation.request_type {
					HandlerRequestType::Post => "post",
					HandlerRequestType::Put => "put",
					HandlerRequestType::Delete => "delete",
					HandlerRequestType::Get => "get",
					HandlerRequestType::Patch => "patch",
				};

				if let Some(query_params_type) = mutation.query_params {
					let query_params = format!("\t\t\tquery_params: {}", query_params_type.typescript_type);
					ts_type.push_str(&format!("{}{}\n", spacing, query_params));
				}

				if let Some(path_type) = mutation.path {
					let path = format!("\t\t\tpath: {}", path_type.typescript_type);
					ts_type.push_str(&format!("{}{}\n", spacing, path));
				}

				if let Some(body_type) = mutation.body_type {
					let body = format!("\t\t\tbody: {}", body_type.typescript_type);
					ts_type.push_str(&format!("{}{}\n", spacing, body));
				}

				let request_type = format!("\t\t\ttype: '{}'", request_type);
				ts_type.push_str(&format!("{}{}\n", spacing, request_type));

				ts_type.push_str(&format!("\t\t}}\n"));

				mutations_ts.push_str(&ts_type);
			}
		}
	}

	queries_ts.push_str("\t},");
	mutations_ts.push_str("\t},");

	let mut handlers_interface = format!("\n\nexport interface Handlers {{\n");

	handlers_interface.push_str(&format!("\tqueries: {}\n", queries_ts));
	handlers_interface.push_str(&format!("\tmutations: {}\n", mutations_ts));
	handlers_interface.push_str("}");

	file.write_all(handlers_interface.as_bytes()).unwrap();
}
