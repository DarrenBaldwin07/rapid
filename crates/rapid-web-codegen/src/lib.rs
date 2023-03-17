use proc_macro::TokenStream;
use quote::quote;

/// Inits a traditional actix-web server entrypoint
/// Note: this is only being done because we need to re-route the macro to point at rapid_web
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
