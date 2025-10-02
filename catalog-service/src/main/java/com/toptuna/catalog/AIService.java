package com.toptuna.catalog;

import com.toptuna.catalog.ai.AIProviderFactory;
import org.springframework.stereotype.Service;

@Service
public class AIService {
    
    private final AIProviderFactory providerFactory;
    
    public AIService(AIProviderFactory providerFactory) {
        this.providerFactory = providerFactory;
    }
    
    public String generateProductDescription(Product product) {
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
            return providerFactory.getProvider().generateText(prompt);
        } catch (Exception e) {
            System.err.println("AI generation error: " + e.getMessage());
            return generateFallbackDescription(product);
        }
    }
    
    public String translateToVietnamese(String germanText) {
        String prompt = String.format(
            "Übersetze folgenden deutschen Text ins Vietnamesische. " +
            "Der Text beschreibt ein Lebensmittelprodukt für vietnamesische Restaurants:\n\n" +
            "%s\n\n" +
            "Übersetze natürlich und verwende Begriffe, die vietnamesische Köche verstehen.",
            germanText
        );
        
        try {
            return providerFactory.getProvider().generateText(prompt);
        } catch (Exception e) {
            System.err.println("AI translation error: " + e.getMessage());
            return generateFallbackVietnamese(germanText);
        }
    }
    
    public String generateMarketingText(Product product, String language) {
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
            return providerFactory.getProvider().generateText(prompt);
        } catch (Exception e) {
            System.err.println("AI marketing error: " + e.getMessage());
            return generateFallbackMarketing(product, language);
        }
    }
    
    public String getActiveProvider() {
        return providerFactory.getActiveProviderInfo();
    }
    
    public String improveProductName(String originalName, String category, String origin) {
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
            return providerFactory.getProvider().generateText(prompt);
        } catch (Exception e) {
            System.err.println("AI name improvement error: " + e.getMessage());
            return originalName + " Premium";
        }
    }
    
    // Fallback methods
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
    
    private String getLocalAsset(String key) {
        try {
            java.util.Properties props = new java.util.Properties();
            props.load(getClass().getClassLoader().getResourceAsStream("local-assets.properties"));
            return props.getProperty(key, "/assets/catalog-service/images/products/default-fish.jpg");
        } catch (Exception e) {
            return "/assets/catalog-service/images/products/default-fish.jpg";
        }
    }
    
    private String generateFallbackMarketing(Product product, String language) {
        return switch (language.toLowerCase()) {
            case "vi" -> "🐟 Sản phẩm tươi ngon, chất lượng cao!";
            case "en" -> "🐟 Fresh, premium quality seafood!";
            default -> "🐟 Frische, hochwertige Meeresfrüchte!";
        };
    }
    
    // KI-basierte Produktdatenverbesserung
    public Product improveProductData(Product product, String issues) {
        System.out.println("🤖 KI korrigiert Produktdaten für " + product.getSku() + ": " + issues);
        
        // Fehlenden Namen mit KI korrigieren
        if (product.getNameDe() == null || product.getNameDe().trim().isEmpty()) {
            String improvedName = improveProductName("Meeresprodukt", 
                product.getCategory() != null ? product.getCategory() : getTranslation("fisch"), 
                product.getOrigin() != null ? product.getOrigin() : "Europa");
            product.setNameDe(improvedName);
            System.out.println("✅ Name KI-generiert: " + improvedName);
        }
        
        // Ungültigen Preis korrigieren
        if (product.getBasePriceEur() <= 0) {
            product.setBasePriceEur(15.99);
            System.out.println("✅ Preis korrigiert: 15.99€");
        }
        
        // Fehlende Kategorie korrigieren
        if (product.getCategory() == null || product.getCategory().trim().isEmpty()) {
            product.setCategory("Meeresfrüchte");
            System.out.println("✅ Kategorie korrigiert: Meeresfrüchte");
        }
        
        // Fehlende Herkunft korrigieren
        if (product.getOrigin() == null || product.getOrigin().trim().isEmpty()) {
            product.setOrigin("Europa");
            System.out.println("✅ Herkunft korrigiert: Europa");
        }
        
        // Vietnamesischen Namen generieren
        if (product.getNameVi() == null || product.getNameVi().trim().isEmpty()) {
            String viName = translateToVietnamese(product.getNameDe());
            product.setNameVi(viName);
            System.out.println("✅ Vietnamesischer Name KI-generiert: " + viName);
        }
        
        // Englischen Namen generieren
        if (product.getNameEn() == null || product.getNameEn().trim().isEmpty()) {
            product.setNameEn(generateEnglishName(product.getNameDe()));
            System.out.println("✅ Englischer Name generiert: " + product.getNameEn());
        }
        
        // Bild-URL korrigieren falls leer
        if (product.getImageUrl() == null || product.getImageUrl().trim().isEmpty()) {
            product.setImageUrl(getLocalAsset("default.image"));
            System.out.println("✅ Standard-Bild zugewiesen");
        }
        
        product.setAiGenerated(true);
        return product;
    }
    
    // Qualitätsverbesserung durch KI
    public Product enhanceProductQuality(Product product) {
        // Einheit standardisieren
        if (product.getUnit() == null || product.getUnit().trim().isEmpty()) {
            product.setUnit("kg");
        }
        
        // Verfügbarkeit auf true setzen
        product.setAvailable(true);
        
        // Beschreibung optimieren falls zu kurz
        if (product.getDescription() != null && product.getDescription().length() < 50) {
            String enhanced = product.getDescription() + " Sorgfältig ausgewählt für höchste Qualitätsansprüche.";
            product.setDescription(enhanced);
        }
        
        return product;
    }
    
    private String generateEnglishName(String germanName) {
        String lowerName = germanName.toLowerCase();
        if (lowerName.contains("dorade")) return "Royal Sea Bream";
        if (lowerName.contains("meeresprodukt")) return "Premium Seafood";
        if (lowerName.contains("meeresfrüchte")) return getTranslation("meeresfrüchte.en");
        if (lowerName.contains("thunfisch")) return getTranslation("thunfisch.en");
        if (lowerName.contains("lachs")) return getTranslation("lachs.en");
        return getTranslation("default.en");
    }
}
