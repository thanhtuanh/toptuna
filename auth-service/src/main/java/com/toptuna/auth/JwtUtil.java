package com.toptuna.auth;
import io.jsonwebtoken.*; import io.jsonwebtoken.security.Keys;
import java.security.Key; import java.util.Date;

public class JwtUtil {
  private static final Key KEY = Keys.hmacShaKeyFor("very-secret-demo-key-32-bytes-long!!".getBytes());
  public static String issue(String user){ return Jwts.builder()
    .setSubject(user).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis()+86400000))
    .signWith(KEY, SignatureAlgorithm.HS256).compact(); }
}
