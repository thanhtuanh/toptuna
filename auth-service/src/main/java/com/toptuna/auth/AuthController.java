package com.toptuna.auth;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api/auth")
public class AuthController {
  
  private final Map<String, Map<String, Object>> users = Map.of(
    "admin", Map.of("password", "admin", "role", "ADMIN", "name", "TopTuna Administrator"),
    "saigon_sushi", Map.of("password", "test", "role", "CUSTOMER", "name", "Saigon Sushi Berlin"),
    "golden_dragon", Map.of("password", "test", "role", "CUSTOMER", "name", "Golden Dragon Heidelberg"),
    "thai_lotus", Map.of("password", "test", "role", "CUSTOMER", "name", "Thai Lotus München"),
    "driver_duc", Map.of("password", "test", "role", "DRIVER", "name", "Nguyen Van Duc"),
    "dispo_mai", Map.of("password", "test", "role", "DISPATCHER", "name", "Tran Thi Mai")
  );

  @PostMapping("/login")
  public Map<String, Object> login(@RequestBody LoginDto dto){
    Map<String, Object> user = users.get(dto.username());
    
    if (user != null && user.get("password").equals(dto.password())) {
      String token = JwtUtil.issue(dto.username());
      
      return Map.of(
        "token", token,
        "user", dto.username(),
        "role", user.get("role"),
        "name", user.get("name"),
        "language", "vi",
        "success", true
      );
    }
    
    return Map.of("success", false, "message", "Invalid credentials");
  }

  @GetMapping("/users")
  public List<Map<String, Object>> getDemoUsers(){
    return users.entrySet().stream()
      .map(e -> Map.of(
        "username", e.getKey(), 
        "role", e.getValue().get("role"),
        "name", e.getValue().get("name")
      ))
      .toList();
  }

  @GetMapping("/health")
  public String health(){ return "OK"; }
}
