package com.toptuna.auth.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

/**
 * Robuste JwtUtil-Implementierung:
 * - liest expiration als String und parsed sicher zu long (Fallback bei leer/ungültig)
 * - verwendet JWT_SECRET wenn vorhanden, ansonsten temporären Key (nur Dev)
 *
 * Hinweis: In Produktion unbedingt JWT_SECRET in der ENV setzen (min. 32 bytes).
 */
@Component
public class JwtUtil {

    private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);

    private final String jwtSecretFromProp;
    private final long jwtExpirationMs;
    private SecretKey key;

    public JwtUtil(
            @Value("${jwt.secret:}") String jwtSecretFromProp,
            // read as string to avoid TypeMismatch when env var exists but is empty
            @Value("${jwt.expiration-ms:900000}") String jwtExpirationMsStr
    ) {
        this.jwtSecretFromProp = Optional.ofNullable(jwtSecretFromProp).orElse("").trim();
        long parsed = 900_000L;
        if (jwtExpirationMsStr != null) {
            String trimmed = jwtExpirationMsStr.trim();
            if (!trimmed.isEmpty()) {
                try {
                    parsed = Long.parseLong(trimmed);
                } catch (NumberFormatException ex) {
                    log.warn("Ungültiger Wert für jwt.expiration-ms: '{}'. Verwende Default {} ms.", jwtExpirationMsStr, parsed);
                }
            } else {
                log.warn("Property jwt.expiration-ms ist leer — verwende Default {} ms.", parsed);
            }
        }
        this.jwtExpirationMs = parsed;
    }

    @PostConstruct
    private void init() {
        if (jwtSecretFromProp != null && !jwtSecretFromProp.isBlank()) {
            byte[] keyBytes = jwtSecretFromProp.getBytes(StandardCharsets.UTF_8);
            if (keyBytes.length < 32) {
                log.warn("JWT secret ist kürzer als 32 bytes ({}). Für Produktion: längeres secret verwenden.", keyBytes.length);
            }
            try {
                this.key = Keys.hmacShaKeyFor(keyBytes);
                log.info("JWT key initialisiert aus konfigurierter Property.");
            } catch (Exception ex) {
                log.error("Fehler beim Erstellen des HMAC-Keys aus jwt.secret, erzeuge temporären Key für Dev.", ex);
                this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
            }
        } else {
            // Kein Secret gesetzt -> lokale Fallback (nur für Dev)
            log.warn("Kein JWT_SECRET gesetzt. Erzeuge temporären Schlüssel für lokale Entwicklung. "
                    + "Setze in Produktion unbedingt die ENV 'JWT_SECRET'.");
            this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        }
    }

    public String generateToken(String subject, Map<String, Object> extraClaims) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtExpirationMs);
        return Jwts.builder()
                .setSubject(subject)
                .addClaims(extraClaims == null ? Map.of() : extraClaims)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(String subject) {
        return generateToken(subject, Map.of());
    }

    public String getSubject(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.debug("Token validierung fehlgeschlagen: {}", e.getMessage());
            return false;
        }
    }
}
