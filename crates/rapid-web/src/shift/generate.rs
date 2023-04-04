use super::{
	convert::{convert_primitive, TypescriptType, TypescriptConverter},
	util::{extract_handler_types, space, get_route_key, remove_last_occurrence, HandlerRequestType, TypeClass, GENERATED_TS_FILE_MESSAGE},
};
use crate::util::validate_route_handler;
use std::{
	fs::{File, OpenOptions},
	io::prelude::*,
	path::PathBuf,
};
use walkdir::WalkDir;

#[derive(Debug, Clone)]
pub enum Handler {
	Query(TypedQueryHandler),
	Mutation(TypedMutationHandler),
}

#[derive(Debug, Clone)]
pub struct RouteKey {
	pub key: String,
	pub value: String,
}

#[derive(Debug, Clone)]
pub struct TypedQueryHandler {
	pub request_type: HandlerRequestType,
	pub path: Option<TypescriptType>,
	pub query_params: Option<TypescriptType>,
	pub output_type: TypescriptType,
	pub route_key: RouteKey
}

#[derive(Debug, Clone)]
pub struct TypedMutationHandler {
	pub request_type: HandlerRequestType,
	pub query_params: Option<TypescriptType>,
	pub path: Option<TypescriptType>,
	pub input_type: Option<TypescriptType>,
	pub output_type: TypescriptType,
	pub route_key: RouteKey
}

/// Function for generating typescript types from a rapid routes directory
pub fn generate_handler_types(routes_path: PathBuf) -> Vec<Handler> {
	let mut handlers: Vec<Handler> = Vec::new();

	let routes_dir = routes_path;

	for route_file in WalkDir::new(routes_dir.clone()) {
		let entry = match route_file {
			Ok(val) => val,
			Err(e) => panic!("An error occurred what attempting to parse directory: {}", e),
		};

		// We only want to handle route files and no directories (the walkDir crate auto iterates through nested dirs)
		if entry.path().is_dir() {
			continue;
		}

		// Create a reference to the current route file and grab its contents as a string
		let mut file = File::open(&entry.path()).unwrap();
		let mut route_file_contents = String::new();
		file.read_to_string(&mut route_file_contents).unwrap();

		// We also want to exit early if the route is invalid
		if !validate_route_handler(&route_file_contents) {
			continue;
		}

		let parsed_route_dir = entry.path().to_str().unwrap_or("/").to_string().replace(routes_dir.to_str().unwrap_or("src/routes"), "").replace(".rs", "");

		let route_key = RouteKey {
			key: get_route_key(&parsed_route_dir, &route_file_contents),
			value: parsed_route_dir
		};

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
			let rust_type = match typed {
				Some(val) => val,
				None => continue,
			};

			let converted_type = match &rust_type.type_value {
				Some(val) => convert_primitive(val),
				None => TypescriptType { typescript_type: String::from("any"), is_optional: false }
			};

			match rust_type.class {
				Some(TypeClass::InputBody) => body_type = Some(converted_type),
				Some(TypeClass::QueryParam) => query_params = Some(converted_type),
				Some(TypeClass::Path) => path = Some(converted_type),
				_ => continue,
			}
		}

		match request_type {
			HandlerRequestType::Get => {
				handlers.push(Handler::Query(TypedQueryHandler {
					request_type,
					path,
					query_params,
					output_type: TypescriptType {
						typescript_type: "any".to_string(),
						is_optional: true
					},
					route_key
				}));
			}
			_ => {
				handlers.push(Handler::Mutation(TypedMutationHandler {
					request_type,
					query_params,
					path,
					input_type: body_type,
					output_type: TypescriptType {
						typescript_type: "any".to_string(),
						is_optional: true
					},
					route_key
				}));
			}
		}
	}

	handlers
}

pub fn create_typescript_types(out_dir: PathBuf, route_dir: PathBuf) {
	let handlers = generate_handler_types(route_dir.clone());

	// Early exit without doing anything if we did not detect any handlers
	if handlers.len() < 1 {
		return;
	}

	let routes = generate_routes(route_dir.to_str().unwrap());

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
				let mut ts_type = format!("\n\t\t{}: {{\n", query.route_key.key);
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

				let output_body = format!("\t\t\toutput: {}", query.output_type.typescript_type);
				ts_type.push_str(&format!("{}{}\n", spacing, output_body));

				let request_type = format!("\t\t\ttype: '{}'", request_type);
				ts_type.push_str(&format!("{}{}\n", spacing, request_type));

				ts_type.push_str(&format!("\t\t}},\n"));

				queries_ts.push_str(&ts_type);
			}
			Handler::Mutation(mutation) => {
				let mut ts_type = format!("\n\t\t{}: {{\n", mutation.route_key.key);
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

				if let Some(body_type) = mutation.input_type {
					let body = format!("\t\t\tinput: {}", body_type.typescript_type);
					ts_type.push_str(&format!("{}{}\n", spacing, body));
				}

				let output_body = format!("\t\t\toutput: {}", mutation.output_type.typescript_type);
				ts_type.push_str(&format!("{}{}\n", spacing, output_body));

				let request_type = format!("\t\t\ttype: '{}'", request_type);
				ts_type.push_str(&format!("{}{}\n", spacing, request_type));

				ts_type.push_str(&format!("\t\t}}\n"));

				mutations_ts.push_str(&ts_type);
			}
		}
	}

	queries_ts.push_str("\t},");

	// Only have tabs when types are present
	if mutations_ts.len() < 2 {
		mutations_ts.push_str("},");
	} else {
		mutations_ts.push_str("\t},");
	}


	let mut handlers_interface = format!("\n\nexport interface Handlers {{\n");

	handlers_interface.push_str(&format!("\tqueries: {}\n", queries_ts));
	handlers_interface.push_str(&format!("\tmutations: {}\n", mutations_ts));
	handlers_interface.push_str("}");

	file.write_all(GENERATED_TS_FILE_MESSAGE.as_bytes()).unwrap();
	file.write_all(handlers_interface.as_bytes()).expect("An error occurred while attempting to");
	file.write_all(routes.as_bytes()).unwrap();
}

pub fn generate_routes(routes_dir: &str) -> String {
	let mut typescript_object = String::from("\n\nexport const routes = {");

	for route_file in WalkDir::new(routes_dir.clone()) {
		let entry = match route_file {
			Ok(val) => val,
			Err(e) => panic!("An error occurred what attempting to parse directory: {}", e),
		};

		// We only want to handle route files and no directories (the walkDir crate auto iterates through nested dirs)
		if entry.path().is_dir() {
			continue;
		}

		// Create a reference to the current route file and grab its contents as a string
		let mut file = File::open(&entry.path()).unwrap();
		let mut route_file_contents = String::new();
		file.read_to_string(&mut route_file_contents).unwrap();

		// We also want to exit early if the route is invalid
		if !validate_route_handler(&route_file_contents) {
			continue;
		}

		let file_name = entry.path().file_name().unwrap();

		// Make sure we ignore middleware and mod files from route generation
		if file_name == "_middleware.rs" || file_name == "mod.rs" {
			continue;
		}

		let parsed_route_dir = entry.path().to_str().unwrap_or("/").to_string().replace(routes_dir, "").replace(".rs", "");

		let route_key = RouteKey {
			key: get_route_key(&parsed_route_dir, &route_file_contents),
			value: remove_last_occurrence(&parsed_route_dir, "index")
		};


		let route = format!("\n\t{}: '{}',", route_key.key, route_key.value);
		typescript_object.push_str(&route);
	 }

	 // Once we are done we want to close off the object
	 typescript_object.push_str("\n}");

	 typescript_object
}


