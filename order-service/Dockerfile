# docker/Dockerfile.maven
FROM maven:3.9.9-eclipse-temurin-21 AS builder
ARG SERVICE_DIR=order-service
WORKDIR /app
COPY . .
RUN mvn -B -DskipTests package -pl ${SERVICE_DIR} -am

FROM eclipse-temurin:21-jre
ARG SERVICE_DIR
WORKDIR /app
COPY --from=builder /app/${SERVICE_DIR}/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
