pub use actix_web as actix;
pub use actix_files as files;
pub use actix_cors as cors;
pub use actix_web_httpauth as auth;
pub mod server;

pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
