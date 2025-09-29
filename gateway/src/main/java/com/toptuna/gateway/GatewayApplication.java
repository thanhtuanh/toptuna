package com.toptuna.gateway;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GatewayApplication {
  public static void main(String[] args) {
    try {
      Dotenv dotenv = Dotenv.configure()
          .filename(System.getenv("ENV") != null && System.getenv("ENV").equals("prod") ? ".env.prod" : ".env")
          .ignoreIfMissing()
          .load();
      dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
    } catch (Exception e) {
      System.out.println("No .env file found, using environment variables");
    }
    SpringApplication.run(GatewayApplication.class, args);
  }
}