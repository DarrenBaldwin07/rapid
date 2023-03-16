use crate::files::Files;

/// A simple route for serving static files from the `public directory by default`
/// See the actix web documentation if you want to implement this yourself: https://actix.rs/docs/static-files
/// Eventually, RAPID will use this to serve error pages, etc
/// Note: this functionality can be turned off in the rapid config file in the root directory of your application
pub fn static_files() -> Files {
    Files::new("/public", "./public").show_files_listing()
}
