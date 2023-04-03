use syn::{Type, ItemStruct};
use super::util::{indent, space, get_struct_generics};

#[derive(Debug)]
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
				"NaiveDateTime" => TypescriptType::new("Date".to_string(), false),
				"DateTime" => TypescriptType::new("Date".to_string(), false),
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
				// By default just convert the
				_ => parsed_type.to_string().into(),
			}
		}
		_ => "any".to_string().into(),
	}
}


// TODO: support `Function` and `TypeAlias`
pub enum ConversionType {
	Primitive,
	Struct,
	Const,
	Enum,
	Function, // Coming soon
	TypeAlias // Coming soon
}

/// Provides ability to convert syn (https://crates.io/crates/syn) parser types to typescript types with ease
pub struct TypescriptConverter {
	pub is_interface: bool,
	pub store: String,
	pub should_export: bool,
	pub indentation: u32,
}

impl TypescriptConverter {
	pub fn new(is_interface: bool, initial_store_value: String, should_export: bool, indentation: u32) -> Self {
		Self {
			is_interface,
			store: initial_store_value,
			should_export,
			indentation
		}
	}

	pub fn convert_struct(mut self, rust_struct: ItemStruct) {
		let export_str = if self.should_export { "export " } else { "" };

		let keyword = if self.is_interface { "interface" } else { "type" };

		let spacing = space(self.indentation);

		// Push an indent to the typescript file
		self.store.push_str(&indent(1));

		let type_scaffold = format!("{export} {key} {name}{generics} {{\n", export = export_str, key = keyword, name = rust_struct.ident, generics = get_struct_generics(rust_struct.generics.clone()));

		// Push our type scaffold to the store string (this string will eventually be pushed to a file once formed fully)
		self.store.push_str(&type_scaffold);

		// Parse all of the structs fields
		for field in rust_struct.fields {
			let field_name = field.ident.unwrap().to_string();
			let field_type = convert_primitive(&field.ty);
			let optional_marking = if field_type.is_optional { "?" } else { "" };

			// For each rust struct field we want to form a valid typescript field and add that field to the typescript type/interface
			self.store.push_str(&format!("{space}{name}{optional}: {ts_type};", space = spacing, name = field_name, ts_type = field_type.typescript_type, optional = optional_marking));
		}


		self.store.push_str("}");
	}

	pub fn convert_primitive(primitive: Type) -> TypescriptType {
		convert_primitive(&primitive)
	}

	fn convert_const() {

	}

	fn convert_enum() {

	}

	fn convert_function() {

	}

	fn convert_type_alias() {

	}
}
