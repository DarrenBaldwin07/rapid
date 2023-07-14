use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
/// A union type that is used as a simple target for the Rapid compiler to generate typescript types for route handlers
///
/// # Example
/// ```
/// use rapid_web::types::Union;
///
/// type RapidOutput = Union<String, ErrorJsonBody>;
/// ```
pub struct Union<O, E> {
    pub output: O,
    pub error: E,
}


