package com.toptuna.catalog;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import java.util.List;

@Service
public class OpenAIService {
    
    @Value("${openai.api.key}")
    private String apiKey;
    
    @Value("${openai.api.url}")
    private String apiUrl;
    
    @Value("${openai.api.model}")
    private String model;
    
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    
    public OpenAIService() {
        this.webClient = WebClient.builder().build();
        this.objectMapper = new ObjectMapper();
    }
    
    public String generateProductDescription(Product product) {
        if (apiKey == null || apiKey.isEmpty()) {
            return generateFallbackDescription(product);
        }
        
        String prompt = String.format(
            "Erstelle eine professionelle Produktbeschreibung für ein B2B-Portal für vietnamesische Restaurants:\n" +
            "Produkt: %s\n" +
            "Kategorie: %s\n" +
            "Herkunft: %s\n" +
            "Preis: %.2f EUR\n\n" +
            "Die Beschreibung soll:\n" +
            "- Professionell und verkaufsfördernd sein\n" +
            "- Für vietnamesische Restaurants relevant sein\n" +
            "- Qualität und Frische betonen\n" +
            "- Maximal 150 Wörter\n" +
            "- Auf Deutsch",
            product.getNameDe(), product.getCategory(), product.getOrigin(), product.getBasePriceEur()
        );
        
        try {
            return callOpenAI(prompt);
        } catch (Exception e) {
            System.err.println("OpenAI API error: " + e.getMessage());
            return generateFallbackDescription(product);
        }
    }
    
    public String translateToVietnamese(String germanText) {
        if (apiKey == null || apiKey.isEmpty()) {
            return generateFallbackVietnamese(germanText);
        }
        
        String prompt = String.format(
            "Übersetze folgenden deutschen Text ins Vietnamesische. " +
            "Der Text beschreibt ein Lebensmittelprodukt für vietnamesische Restaurants:\n\n" +
            "%s\n\n" +
            "Übersetze natürlich und verwende Begriffe, die vietnamesische Köche verstehen.",
            germanText
        );
        
        try {
            return callOpenAI(prompt);
        } catch (Exception e) {
            System.err.println("OpenAI translation error: " + e.getMessage());
            return generateFallbackVietnamese(germanText);
        }
    }
    
    public String generateMarketingText(Product product, String language) {
        if (apiKey == null || apiKey.isEmpty()) {
            return generateFallbackMarketing(product, language);
        }
        
        String langName = switch (language.toLowerCase()) {
            case "vi" -> "Vietnamesisch";
            case "en" -> "Englisch";
            default -> "Deutsch";
        };
        
        String prompt = String.format(
            "Erstelle einen kurzen Marketing-Text (max. 50 Wörter) auf %s für:\n" +
            "Produkt: %s\n" +
            "Kategorie: %s\n" +
            "Der Text soll verkaufsfördernd und einprägsam sein.",
            langName, product.getNameDe(), product.getCategory()
        );
        
        try {
            return callOpenAI(prompt);
        } catch (Exception e) {
            System.err.println("OpenAI marketing error: " + e.getMessage());
            return generateFallbackMarketing(product, language);
        }
    }
    
    public String improveProductName(String originalName, String category, String origin) {
        if (apiKey == null || apiKey.isEmpty()) {
            return originalName + " Premium";
        }
        
        String prompt = String.format(
            "Verbessere folgenden Produktnamen für ein B2B-Portal:\n" +
            "Original: %s\n" +
            "Kategorie: %s\n" +
            "Herkunft: %s\n\n" +
            "Der Name soll:\n" +
            "- Professionell klingen\n" +
            "- Qualität vermitteln\n" +
            "- Für Restaurants attraktiv sein\n" +
            "- Maximal 4 Wörter\n" +
            "- Auf Deutsch",
            originalName, category, origin
        );
        
        try {
            return callOpenAI(prompt);
        } catch (Exception e) {
            System.err.println("OpenAI name improvement error: " + e.getMessage());
            return originalName + " Premium";
        }
    }
    
    private String callOpenAI(String prompt) throws Exception {
        Map<String, Object> request = Map.of(
            "model", model,
            "messages", List.of(
                Map.of("role", "user", "content", prompt)
            ),
            "max_tokens", 150, // Reduziert von 200
            "temperature", 0.5 // Reduziert von 0.7 für konsistentere, schnellere Antworten
        );
        
        String response = webClient.post()
            .uri(apiUrl)
            .header("Authorization", "Bearer " + apiKey)
            .header("Content-Type", "application/json")
            .bodyValue(request)
            .retrieve()
            .bodyToMono(String.class)
            .timeout(java.time.Duration.ofSeconds(30)) // 30 Sekunden Timeout
            .block();
        
        JsonNode jsonResponse = objectMapper.readTree(response);
        return jsonResponse.path("choices").get(0).path("message").path("content").asText().trim();
    }
    
    // Fallback-Methoden wenn kein API Key
    private String generateFallbackDescription(Product product) {
        return String.format("Hochwertiger %s aus %s. Frisch und sorgfältig ausgewählt für professionelle Küchen. Ideal für vietnamesische Restaurants und anspruchsvolle Gastronomie.", 
            product.getNameDe(), product.getOrigin());
    }
    
    private String generateFallbackVietnamese(String germanText) {
        String lowerText = germanText.toLowerCase();
        if (lowerText.contains("thunfisch")) return getTranslation("thunfisch.vi");
        if (lowerText.contains("lachs")) return getTranslation("lachs.vi");
        if (lowerText.contains("dorade")) return getTranslation("dorade.vi");
        return getTranslation("default.vi");
    }
    
    private String getTranslation(String key) {
        try {
            java.util.Properties props = new java.util.Properties();
            props.load(getClass().getClassLoader().getResourceAsStream("ai-translations.properties"));
            return props.getProperty(key, "Sản phẩm chất lượng cao cho ẩm thực Việt Nam.");
        } catch (Exception e) {
            return "Sản phẩm chất lượng cao cho ẩm thực Việt Nam.";
        }
    }
    
    private String generateFallbackMarketing(Product product, String language) {
        return switch (language.toLowerCase()) {
            case "vi" -> "🐟 Sản phẩm tươi ngon, chất lượng cao!";
            case "en" -> "🐟 Fresh, premium quality seafood!";
            default -> "🐟 Frische, hochwertige Meeresfrüchte!";
        };
    }
}
