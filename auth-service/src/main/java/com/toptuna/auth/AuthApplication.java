package com.toptuna.auth;
import org.springframework.boot.SpringApplication; // Hinzufügen
import org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication(exclude = { ReactiveSecurityAutoConfiguration.class })
public class AuthApplication {
  public static void main(String[] args) {
    SpringApplication.run(AuthApplication.class, args);
  }
}