package com.toptuna.catalog.ai;

import org.springframework.stereotype.Component;

@Component
public class FallbackProvider implements AIProvider {
    
    @Override
    public String generateText(String prompt) {
        if (prompt.contains("Produktbeschreibung")) {
            return "Hochwertiges Produkt, frisch und sorgfältig ausgewählt für professionelle Küchen. Ideal für vietnamesische Restaurants und anspruchsvolle Gastronomie.";
        }
        if (prompt.contains("Übersetze") && prompt.contains("Vietnamesisch")) {
            return "Sản phẩm chất lượng cao cho ẩm thực Việt Nam.";
        }
        if (prompt.contains("Marketing")) {
            return "🐟 Frische, hochwertige Meeresfrüchte!";
        }
        return "Qualitätsprodukt für professionelle Küchen.";
    }
    
    @Override
    public String getProviderName() {
        return "Fallback (Local)";
    }
    
    @Override
    public boolean isAvailable() {
        return true;
    }
}
