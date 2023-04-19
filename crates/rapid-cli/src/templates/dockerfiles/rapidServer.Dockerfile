# Buid Dockerfile: docker build -t rapid-server -f ./rapid.Dockerfile .
# Run Dockerfile: docker run -p 8080:8080 rapid-server

FROM rust:1.66-slim-buster as build

# 1. Create a new empty shell project
RUN USER=root cargo new --bin rapid
WORKDIR /rapid

# 2. Copy our manifests
COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml
# Get the rapid config file and copy it over
COPY ./rapid.toml ./rapid.toml
# Copy over the public dir as well
COPY ./public ./public

# Install apt dependencies
RUN apt-get update
RUN apt-get install pkg-config -y
RUN apt-get install libssl-dev -y
# Optional for postgres support
RUN apt-get install libpq-dev -y

# 3. Build only the dependencies to cache them
RUN cargo build --release
RUN rm src/*.rs

# 4. After building the dependencies, copy the rest of the source code over
COPY ./src ./src

# 5. Finally, build for release. (this is the same as cargo build --release but with a specified dir)
RUN cargo install --path .

EXPOSE 8080

# Invoke the binary (this has to be the name of the binary in Cargo.toml)
CMD ["tensor-testing"]
