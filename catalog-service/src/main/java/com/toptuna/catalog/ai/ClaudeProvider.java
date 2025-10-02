package com.toptuna.catalog.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;

@Component
public class ClaudeProvider implements AIProvider {
    
    @Value("${claude.api.key:}")
    private String apiKey;
    
    @Value("${claude.api.url:https://api.anthropic.com/v1/messages}")
    private String apiUrl;
    
    @Value("${claude.api.model:claude-3-haiku-20240307}")
    private String model;
    
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    
    public ClaudeProvider() {
        this.webClient = WebClient.builder().build();
        this.objectMapper = new ObjectMapper();
    }
    
    @Override
    public String generateText(String prompt) {
        try {
            Map<String, Object> request = Map.of(
                "model", model,
                "max_tokens", 150,
                "messages", java.util.List.of(Map.of("role", "user", "content", prompt))
            );
            
            String response = webClient.post()
                .uri(apiUrl)
                .header("x-api-key", apiKey)
                .header("anthropic-version", "2023-06-01")
                .header("Content-Type", "application/json")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .timeout(java.time.Duration.ofSeconds(30))
                .block();
            
            JsonNode jsonResponse = objectMapper.readTree(response);
            return jsonResponse.path("content").get(0).path("text").asText().trim();
        } catch (Exception e) {
            throw new RuntimeException("Claude API error: " + e.getMessage(), e);
        }
    }
    
    @Override
    public String getProviderName() {
        return "Claude (" + model + ")";
    }
    
    @Override
    public boolean isAvailable() {
        return apiKey != null && !apiKey.isEmpty();
    }
}
