use crate::rapid_config::config::ServerConfig;

pub const REMIX_ROUTE_PATH: &'static str = "app/api/routes";
pub const NEXTJS_ROUTE_PATH: &'static str = "pages/api/routes";

pub fn get_routes_dir(rapid_server_config: Option<&ServerConfig>) -> String {
	match rapid_server_config {
		Some(server) => match server.routes_directory.clone() {
			Some(dir) => match dir == "/" {
				true => panic!("The 'routes_directory' variable cannot be set to a base path. Please use something nested!"),
				false => dir,
			},
			None => panic!("Error: the 'routes_directory' variable must be set in your rapid config file!"),
		},
		None => panic!("You must have a valid rapid config file in the base project directory!"),
	}
}
