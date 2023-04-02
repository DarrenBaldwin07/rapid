use syn::Type;

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

fn convert_generic_type(generic_type: &syn::GenericArgument) -> TypescriptType {
	match generic_type {
		syn::GenericArgument::Type(rust_type) => convert_primitive(rust_type),
		_ => "any".to_string().into(),
	}
}

/// Function for converting basic rust primitive types to typescript types and interfaces
pub fn convert_primitive(rust_primitive: &Type) -> TypescriptType {
	match rust_primitive {
		Type::Reference(path) => convert_primitive(&path.elem),
		Type::Path(path) => {
			let segment = path.path.segments.last().unwrap();
			let tokens = &segment.ident;
			let arguments = &segment.arguments;
			let parsed_type = tokens.to_string();
			// TODO: Add cases here for chrono dates as well
			match parsed_type.as_str() {
				"u8" => "number".to_string().into(),
				"u16" => "number".to_string().into(),
				"i64" => "number".to_string().into(),
				"u64" => "number".to_string().into(),
				"u128" => "number".to_string().into(),
				"i8" => "number".to_string().into(),
				"i16" => "number".to_string().into(),
				"i32" => "number".to_string().into(),
				"u32" => "number".to_string().into(),
				"i128" => "number".to_string().into(),
				"isize" => "number".to_string().into(),
				"usize" => "number".to_string().into(),
				"f32" => "number".to_string().into(),
				"f64" => "number".to_string().into(),
				"bool" => "boolean".to_string().into(),
				"char" => "string".to_string().into(),
				"str" => "string".to_string().into(),
				"String" => "string".to_string().into(),
				"NaiveDateTime" => "Date".to_string().into(),
				"DateTime" => "Date".to_string().into(),
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
				_ => parsed_type.to_string().into(),
			}
		}
		_ => "any".to_string().into(),
	}
}
