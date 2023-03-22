mod utils;
use proc_macro::TokenStream;
use proc_macro2::{Ident, Span, TokenStream as TokenStream2};
use quote::quote;
use std::{
	fs::{read_dir, File},
	io::prelude::*,
	path::PathBuf,
};
use utils::{get_all_dirs, base_file_name};

/// Inits a traditional actix-web server entrypoint
/// Note: this is only being done because we need to re-route the macro to point at rapid_web instead of actix
///
/// # Examples
/// ```
/// #[rapid_web::main]
/// async fn main() {
///     async { println!("Hello world"); }.await
/// }
/// ```
#[proc_macro_attribute]
pub fn main(_: TokenStream, item: TokenStream) -> TokenStream {
	let mut output: TokenStream = (quote! {
		#[::rapid_web::actix::rt::main(system = "::rapid_web::actix::rt::System")]
	})
	.into();

	output.extend(item);
	output
}

struct Handler {
	path: String,
	name: String,
	is_nested: bool,
	has_relative_middleware: bool,
}

// Currently, the rapid file-based router will only support GET, POST, DELETE, and PUT request formats (we could support patch if needed)
enum RouteHandler {
	Get(Handler),
	Post(Handler),
	Delete(Handler),
	Put(Handler),
}

/// Macro for generated rapid route handlers based on the file system
///
/// This macro will through the specified path and codegen route handlers for each one
/// Currently, there is only logic inplace to support GET, POST, DELETE, and PUT requests (it does not yet support middleware but will soon)
///
/// * `item` - A string slice that holds the path to the file system routes root directory (ex: "src/routes")
/// # Examples
/// ```
/// routes!("src/routes")
/// ```
#[proc_macro]
pub fn routes(item: proc_macro::TokenStream) -> proc_macro::TokenStream {
	// Parse the inputted routes path param
	let routes_path = if let proc_macro::TokenTree::Literal(literal) = item.into_iter().next().unwrap() {
		literal.to_string()
	} else {
		panic!("Error: Invalid routes path!")
	};

	// Remove string quotes on start and end of path
	let parsed_path = &routes_path[1..routes_path.len() - 1];

	// Directories with routes in them
	let mut route_dirs: Vec<PathBuf> = vec![];
	// Base handlers
	let mut route_handlers: Vec<RouteHandler> = vec![];
	// Check if there is base middleware
	let mut has_root_middleware = false;

	// Get every nested dir and append them to the route_dirs aray
	get_all_dirs(parsed_path, &mut route_dirs);


	// Get all the files from the base specified path
	let route_files = read_dir(parsed_path)
		.unwrap()
		.map(|path| {
			let path = path.unwrap().path();
			path
		})
		.filter(|item| {
			if item.is_dir() {
				return false;
			}

			let file_name = item.file_name().unwrap();

			if file_name == "_middleware.rs" {
				has_root_middleware = true;
			}

			file_name != "mod"
		})
		.collect::<Vec<_>>();


	// Go through each file path and generate route handlers for each one (this is only for the base dir '/')
	for file_path in route_files {
		// Open the route file
		let mut file = File::open(&file_path).unwrap();
		// Get the name of the file (this drives the route path)
		// Index.rs will generate a '/' route and anything else simply is generated based on the file name (stem)
		let file_name = file_path.file_stem().unwrap().to_string_lossy().to_string();
		// Save the file contents to a variable
		let mut file_contents = String::new();
		file.read_to_string(&mut file_contents).unwrap();

		// Construct our handler
		let handler = Handler {
			name: file_name,
			path: String::from("/"),
			is_nested: false,
			has_relative_middleware: false // any file in the base dir does not have relative middleware
		};

		// Check if the contents contain a valid rapid_web route and append them to the route handlers vec
		if file_contents.contains("async fn get") {
			route_handlers.push(RouteHandler::Get(handler))
		} else if file_contents.contains("async fn post") {
			route_handlers.push(RouteHandler::Post(handler))
		} else if file_contents.contains("async fn delete") {
			route_handlers.push(RouteHandler::Delete(handler))
		} else if file_contents.contains("async fn put") {
			route_handlers.push(RouteHandler::Put(handler))
		}
	}

	for nested_file_path in route_dirs {
		// This tells us if the current route hase middleware
		let mut has_middleware = false;

		// Get all the files from the base specified path
		let route_files = read_dir(&nested_file_path)
			.unwrap()
			.map(|path| {
				let path = path.unwrap().path();
				path
			})
			.filter(|item| {
				if item.is_dir() {
					return false;
				}

				let file_name = item.file_name().unwrap();

				if file_name == "_middleware.rs" {
					has_middleware = true;
				}

				file_name != "mod"
			})
			.collect::<Vec<_>>();

		// Get the base file path from the long "src/routes/etc/etc" path
		let cleaned_route_path = base_file_name(&nested_file_path, parsed_path);

		for file_path in route_files {
			// Open the route file
			let mut file = File::open(&file_path).unwrap();
			// Get the name of the file (this drives the route path)
			// Index.rs will generate a '/' route and anything else
			let file_name = file_path.file_stem().unwrap().to_string_lossy().to_string();

			// Check if there is middleware in the current path (this is done via checking for a "_middleware" filename)
			// We do not want to register any middleware handlers so trigger an early exit
			if file_name == String::from("_middleware") {
				continue;
			}

			// TODO: we need to check for middleware in all parent dirs...

			// Save the file contents to a variable
			let mut file_contents = String::new();
			// Get the files contents...
			file.read_to_string(&mut file_contents).unwrap();

			// Construct our handler
			let handler = Handler {
				name: file_name,
				path: cleaned_route_path.clone(),
				is_nested: true,
				has_relative_middleware: has_middleware
			};

			// Check if the contents contain a valid rapid_web route and append them to the route handlers vec
			if file_contents.contains("async fn get") {
				route_handlers.push(RouteHandler::Get(handler))
			} else if file_contents.contains("async fn post") {
				route_handlers.push(RouteHandler::Post(handler))
			} else if file_contents.contains("async fn delete") {
				route_handlers.push(RouteHandler::Delete(handler))
			} else if file_contents.contains("async fn put") {
				route_handlers.push(RouteHandler::Put(handler))
			}
		}
	}

	// Generate the token indents that we will pass into the actix-web router
	let idents = route_handlers
		.into_iter()
		.map(|it| match it {
			RouteHandler::Get(route_handler) => {
				let handler = Ident::new(&route_handler.name, Span::call_site());
				let name = match route_handler.name.as_str() {
					"index" => String::from(""),
					_ => route_handler.name
				};
				let path = {
					if route_handler.is_nested {
						format!("{}/{}", route_handler.path, name)
					} else {
						format!("{}{}", route_handler.path, name)
					}
				};

				// If there is a valid middleware file in the root dir we want to apply it to every route
				if has_root_middleware {
					return quote!(.route(#path, web::get().to(#handler::get).wrap(_middleware::Middleware)));
				}

				quote!(.route(#path, web::get().to(#handler::get)))
			}
			RouteHandler::Post(route_handler) => {
				let handler = Ident::new(&route_handler.name, Span::call_site());
				let name = match route_handler.name.as_str() {
					"index" => String::from(""),
					_ => route_handler.name
				};
				let path = {
					if route_handler.is_nested {
						format!("{}/{}", route_handler.path, name)
					} else {
						format!("{}{}", route_handler.path, name)
					}
				};

				// If there is a valid middleware file in the root dir we want to apply it to every route
				if has_root_middleware {
					return quote!(.route(#path, web::get().to(#handler::get).wrap(_middleware::Middleware)));
				};

				quote!(.route(#path, web::get().to(#handler::get)))
			}
			RouteHandler::Delete(route_handler) => {
				let handler = Ident::new(&route_handler.name, Span::call_site());
				let name = match route_handler.name.as_str() {
					"index" => String::from(""),
					_ => route_handler.name
				};
				let path = {
					if route_handler.is_nested {
						format!("{}/{}", route_handler.path, name)
					} else {
						format!("{}{}", route_handler.path, name)
					}
				};

				// If there is a valid middleware file in the root dir we want to apply it to every route
				if has_root_middleware {
					return quote!(.route(#path, web::get().to(#handler::get).wrap(_middleware::Middleware)));
				};

				quote!(.route(#path, web::get().to(#handler::get)))
			}
			RouteHandler::Put(route_handler) => {
				let handler = Ident::new(&route_handler.name, Span::call_site());
				let name = match route_handler.name.as_str() {
					"index" => String::from(""),
					_ => route_handler.name
				};
				let path = {
					if route_handler.is_nested {
						format!("{}/{}", route_handler.path, name)
					} else {
						format!("{}{}", route_handler.path, name)
					}
				};

				// If there is a valid middleware file in the root dir we want to apply it to every route
				if has_root_middleware {
					return quote!(.route(#path, web::get().to(#handler::get).wrap(_middleware::Middleware)));
				};

				quote!(.route(#path, web::get().to(#handler::get)))
			}
		})
		.collect::<Vec<_>>();

	proc_macro::TokenStream::from(quote!(
		web::scope("")
			#(#idents)*
	))
}

/// A macro for generating imports for every route handler (used in rapid file based routing)
///
/// This macro must be used before any other code runs.
/// # Arguments
///
/// * `item` - A string slice that holds the path to the file system routes root directory
///
/// # Examples
/// ```
/// rapid_configure!("src/routes")
/// ```
#[proc_macro]
pub fn rapid_configure(item: proc_macro::TokenStream) -> proc_macro::TokenStream {
	let path_string = if let proc_macro::TokenTree::Literal(literal) = item.into_iter().next().unwrap() {
		literal.to_string()
	} else {
		panic!("Error: Invalid routes path!")
	};
	let path = &path_string[1..path_string.len() - 1];
	let module_name = Ident::new(&path[path.find("/").map(|it| it + 1).unwrap_or(0)..], Span::call_site());


	let mut route_dirs: Vec<PathBuf> = vec![];

	// Get every nested dir and append them to the route_dirs aray
	get_all_dirs(path, &mut route_dirs);

	// Grab all of the base idents that we need to power the base "/" handler
	let base_idents = std::fs::read_dir(path)
		.unwrap()
		.map(|it| {
			let path = it.unwrap().path();
			let name = path.file_stem().unwrap().to_string_lossy();
			Ident::new(&name, Span::call_site())
		})
		.filter(|it| {
			it.to_string() != "mod"
		})
		.collect::<Vec<_>>();


	let mut nested_idents: Vec<TokenStream2> = Vec::new();

	for dir in route_dirs {
		let string = dir.into_os_string().into_string().unwrap();

		let mod_name = format!("{}", string.replace("src/", "").replace("/", "::"));
		let tokens: proc_macro2::TokenStream = mod_name.parse().unwrap();
		nested_idents.push(quote! { pub use #tokens::*; });
	}

	proc_macro::TokenStream::from(quote!(
		use include_dir::{include_dir, Dir};
		mod #module_name { #(pub mod #base_idents;)* }
		pub use #module_name::{
			#(#base_idents,)*
		};
		#(#nested_idents)*
		const ROUTES_DIR: Dir = include_dir!(#path); // Including the entire routes dir here is what provides the "hot-reload" effect to the config macro
	))
}
