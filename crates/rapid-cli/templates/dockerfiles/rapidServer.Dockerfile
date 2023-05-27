# Buid Dockerfile: docker build -t rapid-server -f ./rapid.Dockerfile .
# Run Dockerfile: docker run -p 8080:8080 rapid-server
# Note: replace `rapid` everywhere with the name of your project

FROM rust:1.66-slim-buster as builder

RUN apt-get update
RUN apt-get install pkg-config -y
# For optional postgres support
RUN apt-get install libssl-dev -y
RUN apt-get install libpq-dev -y

# Create a new empty project
RUN USER=root cargo new --bin api
WORKDIR /api

# Copy the Cargo.toml and Cargo.lock files to cache dependencies
COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml
COPY ./rapid.toml ./rapid.toml
COPY ./public ./public

# Initial build to cache dependencies
RUN cargo build --release
# Dump the original dummy source
RUN rm -rf ./src

# Copy our app code over
COPY ./src ./src

# Finally, Build for release.
RUN rm ./target/release/api*
RUN cargo install --path .

# Entry point for the container
CMD ["./target/release/api"]
