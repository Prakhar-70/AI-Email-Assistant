# Use an official Java 17 runtime as base image
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy Maven wrapper and pom.xml first (for caching)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN chmod +x mvnw
# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline

# Copy the rest of the project files
COPY src ./src

# Package the application (build jar)
RUN ./mvnw clean package -DskipTests

# Expose port 8080 (Spring Boot default)
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "target/email-writer-sb-0.0.1-SNAPSHOT.jar"]
