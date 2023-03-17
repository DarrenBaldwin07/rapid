use proc_macro::TokenStream;
use quote::quote;

/// Marks async main function as the Actix Web system entry-point.
///
/// Note that Actix Web also works under `#[tokio::main]` since version 4.0. However, this macro is
/// still necessary for actor support (since actors use a `System`). Read more in the
/// [`actix_web::rt`](https://docs.rs/actix-web/4/actix_web/rt) module docs.
///
/// # Examples
/// ```
/// #[actix_web::main]
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
