use super::{util::{extract_handler_types, HandlerRequestType, TypeClass, space}, convert::{convert_primitive, TypescriptType}};
use walkdir::WalkDir;
use std::{
	fs::File,
	io::prelude::*
};

#[derive(Debug)]
pub enum Handler {
    Query(TypedQueryHandler),
    Mutation(TypedMutationHandler)
}

#[derive(Debug)]
pub struct TypedQueryHandler {
    pub key: String,
    pub request_type: HandlerRequestType,
    pub path: Option<TypescriptType>,
    pub query_params: Option<TypescriptType>
}

#[derive(Debug)]
pub struct TypedMutationHandler {
    pub key: String,
    pub request_type: HandlerRequestType,
    pub query_params: Option<TypescriptType>,
    pub path: Option<TypescriptType>,
    pub body_type: TypescriptType
}



/// Function for generating typescript types from a rapid routes directory
pub fn generate_handler_types(routes_path: &str) -> Vec<Handler> {
    let mut handlers: Vec<Handler> = Vec::new();

    for route_file in WalkDir::new(routes_path) {
        let entry = match route_file {
            Ok(val) => val,
            Err(e) => panic!("An error occurred what attempting to parse directory: {}", e)
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
            Some(val) => val,
            None => continue
        };

        let mut query_params: Option<TypescriptType> = None;
        let mut body_type: Option<TypescriptType> = None;
        let mut path: Option<TypescriptType> = None;
        let request_type = handler_types[0].as_ref().unwrap().handler_type.clone();

        for typed in handler_types {
            let rust_primitive = match typed {
                Some(val) => val,
                None => continue
            };

            let converted_type = convert_primitive(&rust_primitive.type_value);

            match rust_primitive.class {
                Some(TypeClass::InputBody) => body_type = Some(converted_type),
                Some(TypeClass::QueryParam) => query_params = Some(converted_type),
                Some(TypeClass::Path) => path = Some(converted_type),
                _ => continue
            }
        }

        match request_type {
            HandlerRequestType::Get => {
                handlers.push(Handler::Query(TypedQueryHandler {
                    key: handler_key,
                    request_type,
                    path,
                    query_params
                }));
            },
            _ => {
                handlers.push(Handler::Mutation(TypedMutationHandler {
                    key: handler_key,
                    request_type,
                    query_params,
                    path,
                    body_type: body_type.unwrap()
                }));
            }
        }
    }

    handlers
}


pub fn create_typescript_types(out_dir: &str, route_dir: &str) {
    let handlers = generate_handler_types(route_dir);

    let mut file = File::create(format!("{}/bindings.ts", out_dir)).unwrap();

    for handler in handlers {
        match handler {
            Handler::Query(query) => {
                let mut ts_type = format!("export interface {} {{\n", query.key);
                let spacing = space();

                if let Some(query_params_type) = query.query_params {
                   let query_params = format!("query_params: {}", query_params_type.typescript_type);
                    ts_type.push_str(&format!("{}{}\n", spacing, query_params));
                }

                if let Some(path_type) = query.path {
                    let path = format!("path: {}", path_type.typescript_type);
                    ts_type.push_str(&format!("{}{}\n", spacing, path));
                }

                ts_type.push_str(&format!("}}"));

                file.write_all(ts_type.as_bytes()).unwrap();
            },
            Handler::Mutation(mutation) => {
                let mut query_params = String::new();
                let mut path = String::new();

                if let Some(query_params_type) = mutation.query_params {
                    query_params = format!("query_params: {}", query_params_type.typescript_type);
                }

                if let Some(path_type) = mutation.path {
                    path = format!("path: {}", path_type.typescript_type);
                }

                let mutation_type = format!("
                    export interface {} {{
                        {}
                        {}
                        body: {}
                    }}
                ", mutation.key, query_params, path, mutation.body_type.typescript_type);

                file.write_all(mutation_type.as_bytes()).unwrap();
            }
        }
    }
}
