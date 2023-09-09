use super::util::{get_struct_generics, indent, space};
use log::error;
use std::{env::current_dir, ffi::OsStr, fs::File, io::prelude::*};
use syn::{parse_file, Item, ItemStruct, ItemType, Type};
use walkdir::WalkDir;

#[derive(PartialEq, Debug, Clone)]
pub struct TypescriptType {
	pub typescript_type: String,
	pub is_optional: bool,
}

impl TypescriptType {
	pub fn new(typescript_type: String, is_optional: bool) -> Self {
		Self {
			typescript_type,
			is_optional,
		}
	}
}

impl From<String> for TypescriptType {
	fn from(typescript_type: String) -> TypescriptType {
		TypescriptType {
			typescript_type,
			is_optional: false,
		}
	}
}

/// Function for checking if a type is generic and converting the generic type to a typescript type
fn convert_generic_type(generic_type: &syn::GenericArgument) -> TypescriptType {
	match generic_type {
		syn::GenericArgument::Type(rust_type) => convert_primitive(rust_type),
		_ => "any".to_string().into(), // We could use "unknown" here but "any" is fine for now
	}
}

/// Function for converting basic rust primitive types to typescript types and interfaces
pub fn convert_primitive(rust_primitive: &Type) -> TypescriptType {
	match rust_primitive {
		Type::Tuple(path) => {
			let mut tuple_types: Vec<String> = Vec::new();
			for field in path.elems.iter() {
				let converted_primitive = convert_primitive(field);
				tuple_types.push(converted_primitive.typescript_type);
			}

			TypescriptType {
				typescript_type: format!("{:?}", tuple_types).replace(r#"""#, ""),
				is_optional: false,
			}
		}
		// If we find a reference type we want to extract it and re-call type conversion
		Type::Reference(path) => convert_primitive(&path.elem),
		Type::Path(path) => {
			let segment = path.path.segments.last().unwrap();
			let tokens = &segment.ident;
			let arguments = &segment.arguments;
			let parsed_type = tokens.to_string();
			// TODO: Add cases here for chrono dates as well
			match parsed_type.as_str() {
				"u8" => TypescriptType::new("number".to_string(), false),
				"u16" => TypescriptType::new("number".to_string(), false),
				"i64" => TypescriptType::new("number".to_string(), false),
				"u64" => TypescriptType::new("number".to_string(), false),
				"u128" => TypescriptType::new("number".to_string(), false),
				"i8" => TypescriptType::new("number".to_string(), false),
				"i16" => TypescriptType::new("number".to_string(), false),
				"i32" => TypescriptType::new("number".to_string(), false),
				"u32" => TypescriptType::new("number".to_string(), false),
				"i128" => TypescriptType::new("number".to_string(), false),
				"f32" => TypescriptType::new("number".to_string(), false),
				"f64" => TypescriptType::new("number".to_string(), false),
				"isize" => TypescriptType::new("number".to_string(), false),
				"usize" => TypescriptType::new("number".to_string(), false),
				"bool" => TypescriptType::new("boolean".to_string(), false),
				"char" => TypescriptType::new("string".to_string(), false),
				"str" => TypescriptType::new("string".to_string(), false),
				"String" => TypescriptType::new("string".to_string(), false),
				"Value" => TypescriptType::new("any".to_string(), false),
				"NaiveDateTime" => TypescriptType::new("Date".to_string(), false),
				"DateTime" => TypescriptType::new("Date".to_string(), false),
				"Uuid" => TypescriptType::new("string".to_string(), false),
				"RapidPath" => TypescriptType {
					is_optional: false,
					typescript_type: match arguments {
						syn::PathArguments::Parenthesized(parenthesized_argument) => {
							format!("{:?}", parenthesized_argument)
						}
						syn::PathArguments::AngleBracketed(anglebracketed_argument) => {
							convert_generic_type(anglebracketed_argument.args.first().unwrap()).typescript_type
						}
						_ => "unknown".to_string(),
					},
				},
				"RapidJson" => TypescriptType {
					is_optional: false,
					typescript_type: match arguments {
						syn::PathArguments::Parenthesized(parenthesized_argument) => {
							format!("{:?}", parenthesized_argument)
						}
						syn::PathArguments::AngleBracketed(anglebracketed_argument) => {
							convert_generic_type(anglebracketed_argument.args.first().unwrap()).typescript_type
						}
						_ => "unknown".to_string(),
					},
				},
				"Union" => TypescriptType {
					is_optional: false,
					typescript_type: match arguments {
						syn::PathArguments::AngleBracketed(anglebracketed_argument) => {
							let mut converted_types: Vec<TypescriptType> = Vec::new();
							for generic_type in anglebracketed_argument.args.iter() {
								converted_types.push(convert_generic_type(generic_type));
							}

							// A `Union` type will only ever have two generic types (per `/shift/types.rs`)
							format!("{} | {}", converted_types[0].typescript_type, converted_types[1].typescript_type)
						}
						_ => "unknown".to_string(),
					},
				},
				"Option" => TypescriptType {
					is_optional: true,
					typescript_type: match arguments {
						syn::PathArguments::Parenthesized(parenthesized_argument) => {
							format!("{:?}", parenthesized_argument)
						}
						syn::PathArguments::AngleBracketed(anglebracketed_argument) => {
							convert_generic_type(anglebracketed_argument.args.first().unwrap()).typescript_type
						}
						_ => "unknown".to_string(),
					},
				},
				"Vec" => match arguments {
					syn::PathArguments::Parenthesized(parenthesized_argument) => {
						format!("{:?}", parenthesized_argument)
					}
					syn::PathArguments::AngleBracketed(anglebracketed_argument) => format!(
						"Array<{}>",
						match convert_generic_type(anglebracketed_argument.args.first().unwrap()) {
							TypescriptType {
								is_optional: true,
								typescript_type,
							} => format!("{} | undefined", typescript_type),
							TypescriptType {
								is_optional: false,
								typescript_type,
							} => typescript_type,
						}
					),
					_ => "unknown".to_string(),
				}
				.into(),
				"HashMap" => match arguments {
					syn::PathArguments::Parenthesized(parenthesized_argument) => {
						format!("{:?}", parenthesized_argument)
					}
					syn::PathArguments::AngleBracketed(anglebracketed_argument) => format!(
						"Record<{}>",
						anglebracketed_argument
							.args
							.iter()
							.map(|arg| match convert_generic_type(arg) {
								TypescriptType {
									is_optional: true,
									typescript_type,
								} => format!("{} | undefined", typescript_type),
								TypescriptType {
									is_optional: false,
									typescript_type,
								} => typescript_type,
							})
							.collect::<Vec<String>>()
							.join(", ")
					),
					_ => "any".to_string(),
				}
				.into(),
				// By default just convert the type to a string
				_ => parsed_type.to_string().into(),
			}
		}
		_ => "any".to_string().into(),
	}
}

/// Function for getting the type name as a string from a rust struct
pub fn get_rust_typename(rust_type: &Type) -> String {
	match rust_type {
		Type::Reference(path) => get_rust_typename(&path.elem),
		Type::Path(path) => {
			let segment = path.path.segments.last().unwrap();
			let tokens = &segment.ident;
			let parsed_type = tokens.to_string();
			let arguments = &segment.arguments;
			match parsed_type.as_str() {
				"RapidPath" => match arguments {
					syn::PathArguments::AngleBracketed(anglebracketed_argument) => match anglebracketed_argument.args.first().unwrap() {
						syn::GenericArgument::Type(rust_type) => get_rust_typename(rust_type),
						_ => "unknown".to_string(),
					},
					_ => "unknown".to_string(),
				},
				"RapidJson" => match arguments {
					syn::PathArguments::AngleBracketed(anglebracketed_argument) => match anglebracketed_argument.args.first().unwrap() {
						syn::GenericArgument::Type(rust_type) => get_rust_typename(rust_type),
						_ => "unknown".to_string(),
					},
					_ => "unknown".to_string(),
				},
				_ => parsed_type,
			}
		}
		_ => String::from("any"),
	}
}

// TODO: support `Function`, `TypeAlias`, `Enum`, and `Const`
#[allow(dead_code)]
pub enum ConversionType {
	Primitive,
	Struct,
	Const,
	Enum,
	Function,  // Coming soon
	TypeAlias, // Coming soon
}

/// Provides ability to convert syn (https://crates.io/crates/syn) parser types to typescript types with ease
pub struct TypescriptConverter {
	pub is_interface: bool,
	pub store: String,
	pub should_export: bool,
	pub indentation: u32,
	pub file: File,
	pub converted_types: Vec<String>,
}

impl TypescriptConverter {
	pub fn new(is_interface: bool, initial_store_value: String, should_export: bool, indentation: u32, file: File) -> Self {
		Self {
			is_interface,
			store: initial_store_value,
			should_export,
			indentation,
			file,
			converted_types: Vec::new(),
		}
	}

	/// Function that converts a syn struct to a typescript interface and pushes it to the `store` field
	pub fn convert_struct(&mut self, rust_struct: ItemStruct) {
		let export_str = if self.should_export { "export " } else { "" };

		let keyword = if self.is_interface { "interface" } else { "type" };

		let spacing = space(self.indentation);

		// Push an indentation to the typescript file
		self.store.push_str(&indent(2));

		let type_scaffold = format!(
			"{export}{key} {name}{generics} {{\n",
			export = export_str,
			key = keyword,
			name = rust_struct.ident,
			generics = get_struct_generics(rust_struct.generics.clone())
		);

		// Push our type scaffold to the store string (this string will eventually be pushed to a file once formed fully)
		self.store.push_str(&type_scaffold);

		// Parse all of the structs fields
		for field in rust_struct.fields {
			let field_name = field.ident.unwrap().to_string();
			let field_type = convert_primitive(&field.ty);
			let optional_marking = if field_type.is_optional { "?" } else { "" };

			// For each rust struct field we want to form a valid typescript field and add that field to the typescript type/interface
			self.store.push_str(&format!(
				"{space}{name}{optional}: {ts_type};\n",
				space = spacing,
				name = field_name,
				ts_type = field_type.typescript_type,
				optional = optional_marking
			));
		}

		// Close out our newly generated interface/type
		self.store.push_str("}");

		// Now we want to update the converted types array with the name of the newrly created type
		self.converted_types.push(rust_struct.ident.to_string());
	}

	/// Converts rust primitives to typescript types
	pub fn convert_primitive(&mut self, primitive: Type) -> TypescriptType {
		let converted = convert_primitive(&primitive);
		// We only want to update the converted types if the old typename is not the same as the newly converted type
		if !(get_rust_typename(&primitive) == converted.typescript_type) {
			self.converted_types.push(converted.clone().typescript_type);
		}
		converted
	}

	// TODO: we should also convert constants to typescript aliases as well
	#[allow(dead_code)]
	pub fn convert_const() {}

	// TODO: enums in typescript suck but might be ideal to atleast support conversion
	#[allow(dead_code)]
	pub fn convert_enum() {}

	// TODO: support converting all functions to typescript types
	#[allow(dead_code)]
	pub fn convert_function() {}

	/// Converts rust type aliases to typescript types or interfaces
	pub fn convert_type_alias(&mut self, rust_type_alias: ItemType) {
		let export_str = if self.should_export { "export " } else { "" };

		// Set our type keyword (it defaults to "type" because it does not make sense to use interfaces here)
		let keyword = "type";

		// Push an indentation to the typescript file
		self.store.push_str(&indent(2));

		// Get the name of the type alias
		let alias_name = rust_type_alias.ident.to_string();

		let converted_type = convert_primitive(&rust_type_alias.ty);

		// Scaffold our new type
		let type_scaffold = format!(
			"{export}{key} {name} = {type_value};",
			key = keyword,
			export = export_str,
			name = alias_name,
			type_value = converted_type.typescript_type
		);

		// After constructing the new type lets push it onto the store string
		self.store.push_str(&type_scaffold);

		// Now we want to update the converted types array with the name of the newly created type
		self.converted_types.push(alias_name);
	}

	pub fn generate(&mut self, types: Option<&str>) {
		match types {
			Some(val) => {
				self.file.write_all(val.as_bytes()).expect("Could not write to typescript bindings file!");
			}
			None => {
				self.file
					.write_all(self.store.as_bytes())
					.expect("Could not write to typescript bindings file!");
			}
		}
	}
}

/// Function for generating typescript bindings for every rust type in every file in a given rapid project
pub fn convert_all_types_in_path(directory: &str, converter_instance: &mut TypescriptConverter) {
	// Get the directory that we will be parsing
	let parsing_directory = current_dir().unwrap().join(directory);

	for entry in WalkDir::new(&parsing_directory).sort_by_file_name() {
		match entry {
			Ok(dir_entry) => {
				let path = dir_entry.path();

				// We want to break out if we found a directory
				if path.is_dir() {
					continue;
				}

				// We are only interested in rust files (break out if we do not find one)
				if !(path.extension().unwrap_or(OsStr::new("")).to_str().unwrap_or("") == "rs") {
					continue;
				}

				// Create a reference to the current route file and grab its contents as a string
				let mut file = File::open(&path).expect("Could not open file while attempting to generate Typescript types!");
				let mut file_contents = String::new();
				file.read_to_string(&mut file_contents)
					.expect("Could not open file while attempting to generate Typescript types!");

				// Parse the file into a rust syntax tree
				let file = parse_file(&file_contents).expect("Error: Syn could not parse handler source file!");

				// Grab the routes file name
				let file_name = dir_entry.file_name();

				// We want to ignore all middleware files by default
				if file_name == "_middleware.rs" || file_name == "mod.rs" {
					continue;
				}

				// Go through the newly parsed file and look for types that we want to convert
				// TODO: add more support here for other rust types (enums, constants, etc)
				for item in file.items {
					match item {
						Item::Struct(val) => {
							converter_instance.convert_struct(val);
						}
						Item::Type(val) => {
							// We want to ignore all type aliases that have the name `RapidOutput`
							if val.ident.to_string() == "RapidOutput" {
								continue;
							}
							converter_instance.convert_type_alias(val)
						}
						_ => {
							// If we found a rust item that we do not care about lets just continue
							continue;
						}
					}
				}
			}
			Err(_) => {
				// if we were not able to parse the file lets error out
				error!("An error occurred when attempting to parse directory with path: {:?}", parsing_directory);
				continue;
			}
		}
	}
}


#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test_convert_primitive() {
		let mut converter = TypescriptConverter::new(false, "".to_string(), false, 0, File::create("test.ts").unwrap());
		let converted = converter.convert_primitive(syn::parse_str::<Type>("u8").unwrap());
		assert_eq!(converted.typescript_type, "number");
		assert_eq!(converted.is_optional, false);

		let converted = converter.convert_primitive(syn::parse_str::<Type>("u16").unwrap());
		assert_eq!(converted.typescript_type, "number");
		assert_eq!(converted.is_optional, false);

		let converted = converter.convert_primitive(syn::parse_str::<Type>("i64").unwrap());
		assert_eq!(converted.typescript_type, "number");
		assert_eq!(converted.is_optional, false);

		let converted = converter.convert_primitive(syn::parse_str::<Type>("u64").unwrap());
		assert_eq!(converted.typescript_type, "number");
		assert_eq!(converted.is_optional, false);

		let converted = converter.convert_primitive(syn::parse_str::<Type>("u128").unwrap());
		assert_eq!(converted.typescript_type, "number");
		assert_eq!(converted.is_optional, false);

		let converted = converter.convert_primitive(syn::parse_str::<Type>("i8").unwrap());
		assert_eq!(converted.typescript_type, "number");
		assert_eq!(converted.is_optional, false);

		let converted = converter.convert_primitive(syn::parse_str::<Type>("i16").unwrap());
		assert_eq!(converted.typescript_type, "number");
		assert_eq!(converted.is_optional, false);

		let converted = converter.convert_primitive(syn::parse_str::<Type>("i32").unwrap());
		assert_eq!(converted.typescript_type, "number");
		assert_eq!(converted.is_optional, false);

		let converted = converter.convert_primitive(syn::parse_str::<Type>("u32").unwrap());
		assert_eq!(converted.typescript_type, "number");
		assert_eq!(converted.is_optional, false);

		let converted = converter.convert_primitive(syn::parse_str::<Type>("i128").unwrap());
		assert_eq!(converted.typescript_type, "number");
		assert_eq!(converted.is_optional, false);

		let converted = converter.convert_primitive(syn::parse_str::<Type>("f32").unwrap());
		assert_eq!(converted.typescript_type, "number");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("f64").unwrap());
		assert_eq!(converted.typescript_type, "number");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("isize").unwrap());
		assert_eq!(converted.typescript_type, "number");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("usize").unwrap());

		assert_eq!(converted.typescript_type, "number");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("bool").unwrap());
		assert_eq!(converted.typescript_type, "boolean");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("char").unwrap());
		assert_eq!(converted.typescript_type, "string");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("str").unwrap());
		assert_eq!(converted.typescript_type, "string");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("String").unwrap());
		assert_eq!(converted.typescript_type, "string");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("Value").unwrap());
		assert_eq!(converted.typescript_type, "any");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("NaiveDateTime").unwrap());
		assert_eq!(converted.typescript_type, "Date");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("DateTime").unwrap());
		assert_eq!(converted.typescript_type, "Date");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("Uuid").unwrap());
		assert_eq!(converted.typescript_type, "string");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("RapidPath<String>").unwrap());
		assert_eq!(converted.typescript_type, "string");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("RapidJson<String>").unwrap());
		assert_eq!(converted.typescript_type, "string");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("Union<String, u8>").unwrap());
		assert_eq!(converted.typescript_type, "string | number");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("Option<String>").unwrap());
		assert_eq!(converted.typescript_type, "string");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("Vec<String>").unwrap());
		assert_eq!(converted.typescript_type, "Array<string>");

		let converted = converter.convert_primitive(syn::parse_str::<Type>("HashMap<String, String>").unwrap());
		assert_eq!(converted.typescript_type, "Record<string, string>");
	}
}
