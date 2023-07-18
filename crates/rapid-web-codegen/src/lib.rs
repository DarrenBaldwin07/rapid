mod utils;
use proc_macro::TokenStream;
use proc_macro2::{Ident, Span, TokenStream as TokenStream2};
use quote::quote;
use regex::Regex;
use std::{
	fs::{read_dir, File},
	io::prelude::*,
	path::PathBuf,
};
use utils::{
	base_file_name, get_all_dirs, get_all_middleware, parse_handler_path, parse_route_path, reverse_route_path, validate_route_handler,
	NEXTJS_ROUTE_PATH, REMIX_ROUTE_PATH,
};

// TODO: some of this could leverage tokio

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

// A macro for flagging functions as route handlers for type generation
// Note: this macro does nothing other than serving as a flag for the rapid compiler/file-parser
#[proc_macro_attribute]
pub fn rapid_handler(_attr: TokenStream, item: TokenStream) -> TokenStream {
	item
}

struct Handler {
	path: String,
	absolute_path: String,
	name: String,
	is_nested: bool,
}

// Currently, the rapid file-based router will only support GET, POST, DELETE, and PUT request formats (we could support patch if needed)
enum RouteHandler {
	Query(Handler),
	Mutation(Handler),
	Get(Handler),
	Post(Handler),
	Delete(Handler),
	Put(Handler),
	Patch(Handler),
}

/// Macro for generated rapid route handlers based on the file system
///
/// This macro will look through the specified path and codegen route handlers for each one
/// Currently, there is only logic inplace to support GET, POST, DELETE, and PUT requests as well as middleware via a "_middleware.rs" file
///
/// * `item` - A string slice that holds the path to the file system routes root directory (ex: "src/routes")
/// # Examples
/// ```
/// routes!("src/routes")
/// ```
#[proc_macro]
pub fn routes(item: proc_macro::TokenStream) -> proc_macro::TokenStream {
	// Get the rapid server config file and check for the routes path (we want to panic otherwise)
	let routes_path = if let proc_macro::TokenTree::Literal(literal) = item.into_iter().next().unwrap() {
		literal.to_string()
	} else {
		panic!("Error: Invalid routes path!")
	};

	// If the users routes path is not nested we want to panic
	if routes_path == "/" {
		panic!("The 'routes_directory' variable cannot be set to a base path. Please use something nested!");
	}

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
		// Index.rs will generate a '/' route and anything else simply is generated based on the file name (stem without ".rs")
		let file_name = file_path.file_stem().unwrap().to_string_lossy().to_string();
		// Save the file contents to a variable
		let mut file_contents = String::new();
		file.read_to_string(&mut file_contents).unwrap();

		// Check for dynamic routes
		let dynamic_route_regex = Regex::new(r"_.*?_").unwrap();

		let is_dynamic_route = dynamic_route_regex.is_match(&file_name);

		let parsed_name = match is_dynamic_route {
			true => file_name.replacen("_", r"{", 1).replacen("_", "}", 1),
			false => file_name,
		};

		// Construct our handler
		let handler = Handler {
			name: parsed_name,
			path: String::from("/"),
			absolute_path: parsed_path.to_string(),
			is_nested: false,
		};

		// Check if the contents contain a valid rapid_web route and append them to the route handlers vec
		// Routes are determined valid if they contain a function that starts with "async fn" and contains the "rapid_handler" attribute macro
		parse_handlers(&mut route_handlers, file_contents, handler);
	}

	for nested_file_path in route_dirs {
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

			let dynamic_route_regex = Regex::new(r"_.*?_").unwrap();

			let is_dynamic_route = dynamic_route_regex.is_match(&file_name);

			let parsed_name = match is_dynamic_route {
				true => file_name.replacen("_", r"{", 1).replacen("_", "}", 1),
				false => file_name,
			};

			// Save the file contents to a variable
			let mut file_contents = String::new();
			// Get the files contents...
			file.read_to_string(&mut file_contents).unwrap();

			// Construct our handler
			let handler = Handler {
				name: parsed_name,
				path: parse_route_path(cleaned_route_path.clone()),
				absolute_path: nested_file_path.as_os_str().to_str().unwrap().to_string(),
				is_nested: true,
			};

			// Check if the contents contain a valid rapid_web route and append them to the route handlers vec
			// TODO: we should consider supporting HEAD requests here as well (currently, we require that this be done through a traditional .route() call on the route builder function)
			parse_handlers(&mut route_handlers, file_contents, handler);
		}
	}

	// Generate the token indents that we will pass into the actix-web router
	let idents = route_handlers
		.into_iter()
		.map(|it| match it {
			RouteHandler::Get(route_handler) => generate_handler_tokens(route_handler, parsed_path, "get"),
			RouteHandler::Post(route_handler) => generate_handler_tokens(route_handler, parsed_path, "post"),
			RouteHandler::Delete(route_handler) => generate_handler_tokens(route_handler, parsed_path, "delete"),
			RouteHandler::Put(route_handler) => generate_handler_tokens(route_handler, parsed_path, "put"),
			RouteHandler::Patch(route_handler) => generate_handler_tokens(route_handler, parsed_path, "patch"),
			RouteHandler::Query(route_handler) => generate_handler_tokens(route_handler, parsed_path, "query"),
			RouteHandler::Mutation(route_handler) => generate_handler_tokens(route_handler, parsed_path, "mutation"),
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

	// Get every nested dir and append them to the route_dirs array
	get_all_dirs(path, &mut route_dirs);

	// Grab all of the base idents that we need to power the base "/" handler
	let base_idents = std::fs::read_dir(path)
		.unwrap()
		.map(|it| {
			let path = it.unwrap().path();
			let name = path.file_stem().unwrap().to_string_lossy();
			Ident::new(&name, Span::call_site())
		})
		.filter(|it| it.to_string() != "mod")
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
		use rapid_web::actix::web;
		mod #module_name { #(pub mod #base_idents;)* }
		pub use #module_name::{
			#(#base_idents,)*
		};
		#(#nested_idents)*
		#[cfg(debug_assertions)] // Only run this in debug mode (having extra code in main.rs file makes binary way larger)
		const ROUTES_DIR: Dir = include_dir!(#path); // Including the entire routes dir here is what provides the "hot-reload" effect to the config macro
	))
}

/// A macro for generating imports for every route handler in a Rapid NextJS application
///
/// This macro must be used before any other code runs within your `root.rs` file.
///
/// # Examples
/// ```
/// rapid_configure_nextjs!()
/// ```
#[proc_macro]
pub fn rapid_configure_nextjs(tokens: proc_macro::TokenStream) -> proc_macro::TokenStream {
	generate_route_imports(tokens, NEXTJS_ROUTE_PATH)
}

/// A macro for generating imports for every route handler in a Rapid Remix application
///
/// This macro must be used before any other code runs within your `root.rs` file.
///
/// # Examples
/// ```
/// rapid_configure_remix!()
/// ```
#[proc_macro]
pub fn rapid_configure_remix(tokens: proc_macro::TokenStream) -> proc_macro::TokenStream {
	generate_route_imports(tokens, REMIX_ROUTE_PATH)
}

/// Function that generates handler tokens from a Handler type
/// Note: this currently depends on the assumption that each dir only has 1 _middleware.rs file which we always be the case since dupe file names is not allowed
fn generate_handler_tokens(route_handler: Handler, parsed_path: &str, handler_type: &str) -> proc_macro2::TokenStream {
	let parsed_handler_type: proc_macro2::TokenStream = handler_type.parse().unwrap();

	let mut middleware_paths: Vec<PathBuf> = Vec::new();
	get_all_middleware(&route_handler.absolute_path, parsed_path, &mut middleware_paths);

	let middleware_idents = middleware_paths
		.into_iter()
		.map(|middleware| {
			let base = base_file_name(&middleware.as_path(), parsed_path);

			// Trigger an early exit here if we find that we were in the base dir anyway
			if base == "" {
				return quote!(.wrap(_middleware::Middleware));
			}
			// Parse the module name string and remove all the slashes (ex: "/job" endpoint)
			let mod_name = format!("{}", base.replacen("/", "", 1)).replace("/", "::");

			let parsed_mod: proc_macro2::TokenStream = mod_name.parse().unwrap();

			quote!(.wrap(#parsed_mod::_middleware::Middleware))
		})
		.collect::<Vec<_>>();

	// We want all "index.rs" files to auto map to "/"
	let name = match route_handler.name.as_str() {
		"index" => String::from(""),
		_ => format!("/{}", route_handler.name),
	};

	let parsed_path = match route_handler.path.as_str() {
		"/" => "",
		_ => route_handler.path.as_str(),
	};

	// Parse the module name string and remove all the slashes (ex: "/job" endpoint)
	let handler_mod_name = format!(
		"{}",
		parse_handler_path(&format!("{}/{}", reverse_route_path(parsed_path.to_string()), route_handler.name)).replacen("/", "", 1)
	)
	.replace("/", "::");
	let handler: proc_macro2::TokenStream = handler_mod_name.parse().unwrap();

	// This is the path string that gets passed to the ".route(path)" function
	let rapid_routes_path = {
		if route_handler.is_nested {
			format!("{}{}", parsed_path, name)
		} else {
			// If the router is not nested then we want to set the name to a slash
			let parsed_name = match name.as_str() {
				"" => "/",
				_ => name.as_str(),
			};

			format!("{}{}", parsed_path, parsed_name)
		}
	};

	// Output our idents based on the handler types
	match handler_type {
		// Check if we got a query or mutation..
		"query" => {
			// If we got a query type we want to generate routes for `get` request types (`delete` could get moved to here too...?)
			quote!(
				.route(#rapid_routes_path, web::get().to(#handler::#parsed_handler_type)#(#middleware_idents)*)
			)
		}
		"mutation" => {
			// If we got a mutation type we want to generate routes for each of the following (all at the same path):
			// `post`, `put`, `patch`, `delete`
			quote!(
				.route(#rapid_routes_path, web::post().to(#handler::#parsed_handler_type)#(#middleware_idents)*)
				.route(#rapid_routes_path, web::put().to(#handler::#parsed_handler_type)#(#middleware_idents)*)
				.route(#rapid_routes_path, web::patch().to(#handler::#parsed_handler_type)#(#middleware_idents)*)
				.route(#rapid_routes_path, web::delete().to(#handler::#parsed_handler_type)#(#middleware_idents)*)
			)
		}
		// Currently we still support declaring handlers with a very specific HTTP type (ex: `get` or `post` etc)
		// ^^^ Eventually, what was described above should get deprecated
		_ => quote!(.route(#rapid_routes_path, web::#parsed_handler_type().to(#handler::#parsed_handler_type)#(#middleware_idents)*)),
	}
}

/// Function for parsing a route file and making sure it contains a valid handler
/// If it does, we want to push the valid handler to the handlers array
/// Note: no need to support HEAD and OPTIONS requests
fn parse_handlers(route_handlers: &mut Vec<RouteHandler>, file_contents: String, handler: Handler) {
	// TODO: we need to depricate everything except for `query` and `mutation`
	if file_contents.contains("async fn get") && validate_route_handler(&file_contents) {
		route_handlers.push(RouteHandler::Get(handler))
	} else if file_contents.contains("async fn post") && validate_route_handler(&file_contents) {
		route_handlers.push(RouteHandler::Post(handler))
	} else if file_contents.contains("async fn delete") && validate_route_handler(&file_contents) {
		route_handlers.push(RouteHandler::Delete(handler))
	} else if file_contents.contains("async fn put") && validate_route_handler(&file_contents) {
		route_handlers.push(RouteHandler::Put(handler))
	} else if file_contents.contains("async fn patch") && validate_route_handler(&file_contents) {
		route_handlers.push(RouteHandler::Patch(handler))
	} else if file_contents.contains("async fn query") && validate_route_handler(&file_contents) {
		route_handlers.push(RouteHandler::Query(handler))
	} else if file_contents.contains("async fn mutation") && validate_route_handler(&file_contents) {
		route_handlers.push(RouteHandler::Mutation(handler))
	}
}

/// Generates route imports based on a framework specific base routes directory
fn generate_route_imports(tokens: proc_macro::TokenStream, routes_directory: &str) -> proc_macro::TokenStream {
	// Parse the tokens and check if they did not contain anything...
	let path = if tokens.is_empty() {
		// Output the default remix routes path if we did not find any tokens passed in by the user
		routes_directory.to_string()
	} else {
		// If we found any tokens we want to output them and use them as the routes path
		let path_string = if let proc_macro::TokenTree::Literal(literal) = tokens.into_iter().next().unwrap() {
			let raw_path = literal.to_string();
			raw_path[1..raw_path.len() - 1].to_string()
		} else {
			routes_directory.to_string()
		};
		path_string.to_string()
	};

	let module_name = Ident::new("routes", Span::call_site());

	let mut route_dirs: Vec<PathBuf> = vec![];

	// Get every nested dir and append them to the route_dirs array
	get_all_dirs(&path, &mut route_dirs);

	// Grab all of the base idents that we need to power the base "/" handler
	let base_idents = std::fs::read_dir(&path)
		.unwrap()
		.map(|it| {
			let path = it.unwrap().path();
			let name = path.file_stem().unwrap().to_string_lossy();
			Ident::new(&name, Span::call_site())
		})
		.filter(|it| it.to_string() != "mod")
		.collect::<Vec<_>>();

	let mut nested_idents: Vec<TokenStream2> = Vec::new();

	for dir in route_dirs {
		let string = dir.into_os_string().into_string().unwrap();
		let delimiter = "routes";
		let start_index = match string.find(delimiter) {
			Some(index) => index + delimiter.len(),
			None => {
				panic!("Invalid route directory!");
			}
		};
		let mod_name = format!("routes{}", &string[start_index..].replace("/", "::"));
		let tokens: proc_macro2::TokenStream = mod_name.parse().unwrap();
		nested_idents.push(quote! { pub use #tokens::*; });
	}

	// If the user wanted to use their own path we should force them to import their routes dir
	if path != routes_directory {
		return proc_macro::TokenStream::from(quote!(
			use include_dir::{include_dir, Dir};
			use rapid_web::actix::web;
			pub use #module_name::{
				#(#base_idents,)*
			};
			#(#nested_idents)*
			#[cfg(debug_assertions)] // Only run this in debug mode when the user actually wants hot-reload (having extra code in main.rs file makes binary way larger)
			const ROUTES_DIR: Dir = include_dir!(#path); // Including the entire routes dir here is what provides the "hot-reload" effect to the config macro
		));
	} else {
		// Since the user did not specify a custom path we can just assume they used the `REMIX_ROUTE_PATH`
		return proc_macro::TokenStream::from(quote!(
			use include_dir::{include_dir, Dir};
			use rapid_web::actix::web;
			mod #module_name { #(pub mod #base_idents;)* }
			pub use #module_name::{
				#(#base_idents,)*
			};
			#(#nested_idents)*
			#[cfg(debug_assertions)] // Only run this in debug mode (having extra code in main.rs file makes binary way larger)
			const ROUTES_DIR: Dir = include_dir!(#path); // Including the entire routes dir here is what provides the "hot-reload" effect to the config macro
		));
	}
}
