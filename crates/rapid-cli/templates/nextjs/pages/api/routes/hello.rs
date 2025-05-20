use rapid_web::actix::HttpResponse;
use rapid_web::rapid_web_codegen::rapid_handler;
use rapid_web::json_response;
use serde::{Serialize, Deserialize};

pub const ROUTE_KEY: &str = "hello";
pub type RapidOutput = String;

// Define a sample User struct that could be returned as JSON
#[derive(Serialize, Deserialize)]
pub struct User {
    name: String,
    email: String,
    age: u32,
}

#[rapid_handler]
pub async fn query() -> HttpResponse {
    // Example 1: Simple text response
    // HttpResponse::Ok().body("Hello from a RAPID rust endpoint!")
    
    // Example 2: Structured JSON response with correct content-type header
    let user = User {
        name: "John Doe".to_string(),
        email: "john@example.com".to_string(),
        age: 30,
    };
    
    // Use json_response helper to ensure correct content-type header
    json_response(user)
}
