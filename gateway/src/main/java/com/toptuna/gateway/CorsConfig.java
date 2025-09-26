package com.toptuna.gateway;
import org.springframework.beans.factory.annotation.Value; import org.springframework.context.annotation.*; 
import org.springframework.web.cors.*; import org.springframework.web.cors.reactive.*;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {
  @Bean public CorsWebFilter corsWebFilter(@Value("${toptuna.cors.allowed-origins}") String origins){
    CorsConfiguration cfg = new CorsConfiguration(); cfg.addAllowedOrigin(origins);
    cfg.addAllowedMethod("*"); cfg.addAllowedHeader("*"); cfg.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource(); src.registerCorsConfiguration("/**", cfg);
    return new CorsWebFilter(src);
  }
}
