use super::convert::{convert_primitive, TypescriptType};
use syn::{parse_file, Expr, File as SynFile, Generics, Item, Lit, Type};

pub const GENERATED_TS_FILE_MESSAGE: &str =
	"// @generated automatically by Rapid-web (https://rapidframework.dev). DO NOT CHANGE OR EDIT THIS FILE!";

/// Valid handler function names that Rapid recognizes as route handlers.
/// Only `query` and `mutation` are the canonical handler types.
/// The legacy HTTP method names (`get`, `post`, `put`, `delete`, `patch`) are
/// deprecated and will be mapped to `query` or `mutation` automatically.
pub const VALID_HANDLER_NAMES: &[&str] = &["query", "mutation", "get", "post", "put", "delete", "patch"];

#[derive(Debug)]
pub enum TypeClass {
	InputBody,
	QueryParam,
	Path,
	Invalid,
	Return,
}

/// Represents the two canonical handler types in Rapid.
///
/// - `Query` maps to HTTP GET (read operations)
/// - `Mutation` maps to HTTP POST/PUT/PATCH/DELETE (write operations)
///
/// The legacy HTTP method-specific handler types (`get`, `post`, `put`, `delete`, `patch`)
/// have been deprecated in favor of `query` and `mutation`.
#[derive(Debug, Clone, PartialEq)]
pub enum HandlerRequestType {
	Query,
	Mutation,
}

impl HandlerRequestType {
	/// Parses a handler function name into the corresponding `HandlerRequestType`.
	///
	/// - `"query"` and `"get"` map to `Query`
	/// - `"mutation"`, `"post"`, `"put"`, `"delete"`, and `"patch"` map to `Mutation`
	///
	/// Legacy HTTP method names (`get`, `post`, `put`, `delete`, `patch`) are accepted
	/// for backwards compatibility but will emit a deprecation warning.
	///
	/// Unknown function names default to `Query` with a warning.
	pub fn from_function_name(name: &str) -> Self {
		match name {
			"query" => HandlerRequestType::Query,
			"mutation" => HandlerRequestType::Mutation,
			// Deprecated: legacy HTTP method names are mapped to query/mutation
			"get" => {
				eprintln!(
					"[rapid-web] DEPRECATION WARNING: Handler function name 'get' is deprecated. Use 'query' instead."
				);
				HandlerRequestType::Query
			}
			"post" | "put" | "patch" | "delete" => {
				eprintln!(
					"[rapid-web] DEPRECATION WARNING: Handler function name '{}' is deprecated. Use 'mutation' instead.",
					name
				);
				HandlerRequestType::Mutation
			}
			_ => {
				eprintln!(
					"[rapid-web] WARNING: Unknown handler function name '{}'. Defaulting to 'query'. Valid names are: query, mutation.",
					name
				);
				HandlerRequestType::Query
			}
		}
	}

	/// Returns the canonical string representation of this handler type.
	/// Always returns either `"query"` or `"mutation"`.
	pub fn as_str(&self) -> &'static str {
		match self {
			HandlerRequestType::Query => "query",
			HandlerRequestType::Mutation => "mutation",
		}
	}
}

#[derive(Debug)]
pub struct HandlerType {
	pub type_value: Option<Type>,
	pub class: Option<TypeClass>,
	pub handler_type: HandlerRequestType,
}

pub fn extract_handler_types(route_source: &str) -> Option<Vec<Option<HandlerType>>> {
	let parsed_file: SynFile = syn::parse_str(route_source).expect("Error: Syn could not parse handler source file!");
	for item in parsed_file.items {
		// The first route handler that we find we want to break out
		// Any valid handler functions found after the first one are ignored (in rapid, only one handler is allowed per file)
		if let Item::Fn(function) = item {
			if is_valid_handler("rapid_handler", function.attrs) {
				let mut function_types: Vec<Option<HandlerType>> = Vec::new();
				let arg_types = function.sig.inputs.iter();
				let function_name = function.sig.ident.to_string();
				let handler_type = HandlerRequestType::from_function_name(&function_name);

				for type_value in arg_types {
					if let syn::FnArg::Typed(typed) = type_value {
						let rust_type = *typed.ty.clone();
						let type_class = get_type_class(rust_type.clone());
						function_types.push(Some(HandlerType {
							type_value: Some(rust_type),
							class: type_class,
							handler_type: handler_type.clone(),
						}));
					}
				}

				function_types.push(Some(HandlerType {
					type_value: None,
					class: Some(TypeClass::Return),
					handler_type: handler_type.clone(),
				}));

				return Some(function_types);
			}
		}
	}

	None
}

pub fn get_handler_type(route_source: &str) -> Option<String> {
	let parsed_file: SynFile = syn::parse_str(route_source).expect("Error: Syn could not parse handler source file!");
	for item in parsed_file.items {
		// The first route handler that we find we want to break out
		// Any valid handler functions found after the first one are ignored (in rapid, only one handler is allowed per file)
		if let Item::Fn(function) = item {
			if is_valid_handler("rapid_handler", function.attrs) {
				let function_name = function.sig.ident.to_string();
				return Some(function_name);
			}
		}
	}

	None
}

pub fn get_type_class(rust_type: Type) -> Option<TypeClass> {
	match rust_type {
		Type::Reference(path) => get_type_class(*path.elem),
		Type::Path(path) => {
			let segment = path.path.segments.last().unwrap();
			let tokens = &segment.ident;

			Some(match tokens.to_string().as_str() {
				"RapidPath" => TypeClass::Path,
				"RapidQuery" => TypeClass::QueryParam,
				"RapidJson" => TypeClass::InputBody, // TODO: support return statements here as well (right now we are defaulting to invalid until implemented)
				_ => TypeClass::Invalid,
			})
		}
		_ => None,
	}
}

/// Method for checking if a handler function is valid
/// Handlers are only valid if they have a "#[rapid_handler]" macro on them
pub fn is_valid_handler(macro_name: &str, attributes: Vec<syn::Attribute>) -> bool {
	attributes
		.iter()
		.any(|attr| attr.path().segments.iter().any(|segment| segment.ident == macro_name))
}

/// Method for creating spacing for the generated typescript file by rapid
pub fn space(space_amount: u32) -> String {
	let mut space_string = "".to_string();
	for _ in 0..space_amount {
		space_string.push(' ');
	}
	space_string
}

/// Method for providing indentions within strings (mainly used in generated typescript file that is generated by rapid)
pub fn indent(amount: u32) -> String {
	let mut new_amount = String::new();

	for _ in 0..amount {
		new_amount.push('\n');
	}
	new_amount
}

/// Function for extracting generics from a rust struct
pub fn get_struct_generics(type_generics: Generics) -> String {
	let mut generic_params: Vec<String> = Vec::new();

	for generic_param in type_generics.params {
		if let syn::GenericParam::Type(rust_type) = generic_param {
			generic_params.push(rust_type.ident.to_string());
		}
	}

	if generic_params.is_empty() {
		"".to_string()
	} else {
		format!("<{}>", generic_params.join(", "))
	}
}

/// A function for getting the route key of a rapid route handler
/// Handlers will have a route key that is always unique (we can never have duplicate route keys)
/// If we find a handler with a ROUTE_KEY constant delcared in it we want to use it as the route key for the handler (This is the key that clients will use to request the route)
pub fn get_route_key(file_path: String, handler_source: &str) -> String {
	// Parse the file into a rust syntax tree
	let file = parse_file(handler_source).expect("Error: Rapid compiler could not parse handler source file!");

	// Generate a default route_key as a fallback (this is based on the file path)
	let fallback_key = file_path.replacen("/", "", 1).replace("/", "_").replace(".rs", "");

	// Look for a variable called "ROUTE_KEY"
	for item in file.items {
		match item {
			Item::Const(item_const) => {
				if item_const.ident.to_string() == "ROUTE_KEY" {
					return match *item_const.expr {
						Expr::Lit(item) => match item.lit {
							Lit::Str(val) => {
								let key = val.token().to_string();

								if key == "index" {
									panic!("Invalid route key: 'index' is a reserved route key for rapid-web");
								}

								key
							}
							_ => continue,
						},
						_ => continue,
					};
				}

				continue;
			}
			_ => continue,
		}
	}

	fallback_key
}

pub fn get_output_type_alias(handler_source: &str) -> TypescriptType {
	// Parse the file into a rust syntax tree
	let file = parse_file(handler_source).expect("Error: Rapid compiler could not parse handler source file!");

	// Fallback to an `any` type if we can't find a type alias configured by the user
	let fallback_alias = TypescriptType {
		typescript_type: "any".to_string(),
		is_optional: false,
	};

	for item in file.items {
		if let Item::Type(item_type) = item {
			// Check to make sure that the user named the type "Output"
			// We do not want to support any other names (for now)
			if item_type.ident.to_string() == "RapidOutput" {
				let syn_type = *item_type.ty;
				return convert_primitive(&syn_type);
			}
		}
	}

	return fallback_alias;
}

/// Function for checking if a rapid route path is dynamic (example: "/route/todo/_id_" -- this route is dynamic because it has a "_id_" substring)
pub fn is_dynamic_route(str: &str) -> bool {
	// Check for a regex match for a substring similar to "_anythingInHere_"
	let regex = regex::Regex::new(r"_.*?_").unwrap();
	regex.is_match(str)
}

/// Removes the last occurrence of a substring in a string
pub fn remove_last_occurrence(s: &str, sub: &str) -> String {
	let mut split = s.rsplitn(2, sub);
	let back = split.next().unwrap_or("");
	let front = split.next().unwrap_or("").to_owned();
	front + back
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test_remove_last_occurrence() {
		let test_string = "/src/routes/service/index";
		let test_substring = "index";

		assert_eq!(remove_last_occurrence(test_string, test_substring), "/src/routes/service/");
	}

	#[test]
	fn test_is_dynamic_route() {
		let test_string = "/src/routes/service/_id_";
		let test_string_2 = "/src/routes/service/index";

		assert_eq!(is_dynamic_route(test_string), true);
		assert_eq!(is_dynamic_route(test_string_2), false);
	}
}
