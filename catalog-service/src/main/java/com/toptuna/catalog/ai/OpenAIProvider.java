package com.toptuna.catalog.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import java.util.List;

@Component
public class OpenAIProvider implements AIProvider {
    
    @Value("${openai.api.key:}")
    private String apiKey;
    
    @Value("${openai.api.url:https://api.openai.com/v1/chat/completions}")
    private String apiUrl;
    
    @Value("${openai.api.model:gpt-4o-mini}")
    private String model;
    
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    
    public OpenAIProvider() {
        this.webClient = WebClient.builder().build();
        this.objectMapper = new ObjectMapper();
    }
    
    @Override
    public String generateText(String prompt) {
        try {
            Map<String, Object> request = Map.of(
                "model", model,
                "messages", List.of(Map.of("role", "user", "content", prompt)),
                "max_tokens", 150,
                "temperature", 0.5
            );
            
            String response = webClient.post()
                .uri(apiUrl)
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .timeout(java.time.Duration.ofSeconds(30))
                .block();
            
            JsonNode jsonResponse = objectMapper.readTree(response);
            return jsonResponse.path("choices").get(0).path("message").path("content").asText().trim();
        } catch (Exception e) {
            throw new RuntimeException("OpenAI API error: " + e.getMessage(), e);
        }
    }
    
    @Override
    public String getProviderName() {
        return "OpenAI (" + model + ")";
    }
    
    @Override
    public boolean isAvailable() {
        return apiKey != null && !apiKey.isEmpty();
    }
}
