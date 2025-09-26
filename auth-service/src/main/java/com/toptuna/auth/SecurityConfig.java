package com.toptuna.auth;
import org.springframework.context.annotation.*; import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity; import org.springframework.security.web.server.SecurityWebFilterChain;
@Configuration @EnableWebFluxSecurity
public class SecurityConfig {
  @Bean SecurityWebFilterChain filter(ServerHttpSecurity http){
    return http.csrf(ServerHttpSecurity.CsrfSpec::disable).authorizeExchange(a->a.anyExchange().permitAll()).build();
  }
}
