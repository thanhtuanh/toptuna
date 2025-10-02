package com.toptuna.catalog;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@Service
public class SyncService {
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final AIService aiService;
    private final ProductService productService;
    private final BackupService backupService;
    
    @Value("${toptuna.external.api.url:https://api.toptuna.de/products}")
    private String externalApiUrl;
    
    @Value("${toptuna.external.api.key:}")
    private String externalApiKey;
    
    public SyncService(AIService aiService, ProductService productService, BackupService backupService) {
        this.aiService = aiService;
        this.productService = productService;
        this.backupService = backupService;
    }
    
    // Vorschau der Änderungen ohne zu speichern
    public SyncPreview previewSync() {
        try {
            List<Map<String, Object>> externalProducts = fetchExternalProducts();
            List<SyncChange> changes = new ArrayList<>();
            
            for (Map<String, Object> extProduct : externalProducts) {
                Product newProduct = mapExternalToProduct(extProduct);
                Product existingProduct = productService.getProductBySku(newProduct.getSku()).orElse(null);
                
                // Validierung und KI-Verbesserung
                ValidationResult validation = validateProduct(newProduct);
                if (!validation.isValid()) {
                    newProduct = aiService.improveProductData(newProduct, validation.getIssues());
                }
                
                // KI-Beschreibungen generieren
                if (newProduct.getDescription() == null || newProduct.getDescription().isEmpty()) {
                    String aiDescription = aiService.generateProductDescription(newProduct);
                    newProduct.setDescription(aiDescription);
                    newProduct.setAiGenerated(true);
                }
                
                if (newProduct.getDescriptionVi() == null || newProduct.getDescriptionVi().isEmpty()) {
                    String viDescription = aiService.translateToVietnamese(newProduct.getDescription());
                    newProduct.setDescriptionVi(viDescription);
                }
                
                newProduct = aiService.enhanceProductQuality(newProduct);
                
                // Änderungen vergleichen
                SyncChange change = compareProducts(existingProduct, newProduct);
                if (change != null) {
                    changes.add(change);
                }
            }
            
            return new SyncPreview(changes);
            
        } catch (Exception e) {
            throw new RuntimeException("Sync preview error: " + e.getMessage());
        }
    }
    
    // Bestätigte Synchronisation durchführen
    public void confirmSync() {
        try {
            // 1. Backup vor Sync erstellen
            System.out.println("🔄 Erstelle Backup vor Synchronisation...");
            String backupFile = backupService.createBackup();
            System.out.println("✅ Backup gespeichert: " + backupFile);
            
            // 2. Externe Daten holen und synchronisieren
            List<Map<String, Object>> externalProducts = fetchExternalProducts();
            System.out.println("📥 " + externalProducts.size() + " Produkte zur Verarbeitung gefunden");
            
            int processed = 0;
            for (Map<String, Object> extProduct : externalProducts) {
                try {
                    Product product = mapExternalToProduct(extProduct);
                    
                    ValidationResult validation = validateProduct(product);
                    if (!validation.isValid()) {
                        product = aiService.improveProductData(product, validation.getIssues());
                    }
                    
                    if (product.getDescription() == null || product.getDescription().isEmpty()) {
                        String aiDescription = aiService.generateProductDescription(product);
                        product.setDescription(aiDescription);
                        product.setAiGenerated(true);
                    }
                    
                    if (product.getDescriptionVi() == null || product.getDescriptionVi().isEmpty()) {
                        String viDescription = aiService.translateToVietnamese(product.getDescription());
                        product.setDescriptionVi(viDescription);
                    }
                    
                    product = aiService.enhanceProductQuality(product);
                    product.setLastSync(LocalDateTime.now());
                    productService.saveProduct(product);
                    
                    processed++;
                    if (processed % 5 == 0) {
                        System.out.println("✅ " + processed + "/" + externalProducts.size() + " Produkte verarbeitet");
                    }
                    
                } catch (Exception e) {
                    System.err.println("❌ Fehler bei Produkt " + extProduct.get("sku") + ": " + e.getMessage());
                    // Weiter mit nächstem Produkt
                }
            }
            
            System.out.println("✅ Synchronisation abgeschlossen - " + processed + " Produkte verarbeitet");
            
        } catch (Exception e) {
            System.err.println("❌ Sync-Fehler: " + e.getMessage());
            throw new RuntimeException("Sync error: " + e.getMessage());
        }
    }
    
    // Dynamisches Holen der externen Produktdaten
    private List<Map<String, Object>> fetchExternalProducts() {
        try {
            // Versuche echte API zu verwenden
            if (externalApiKey != null && !externalApiKey.isEmpty()) {
                return callExternalAPI();
            } else {
                // Fallback: Generiere dynamische Demo-Daten basierend auf aktuellen Produkten
                return generateDynamicDemoData();
            }
        } catch (Exception e) {
            System.err.println("External API error, using demo data: " + e.getMessage());
            return generateDynamicDemoData();
        }
    }
    
    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> callExternalAPI() {
        // Echter API-Call zu toptuna.de oder anderem System
        return restTemplate.getForObject(externalApiUrl + "?api_key=" + externalApiKey, List.class);
    }
    
    private List<Map<String, Object>> generateDynamicDemoData() {
        List<Product> currentProducts = productService.getAllProducts();
        List<Map<String, Object>> dynamicData = new ArrayList<>();
        
        // Bestehende Produkte mit Änderungen
        for (Product existing : currentProducts) {
            if (Math.random() > 0.5) { // 50% Chance auf Änderung
                Map<String, Object> modified = Map.of(
                    "id", "ext-" + existing.getSku(),
                    "sku", existing.getSku(),
                    "name", existing.getNameDe() + " " + getRandomSuffix(),
                    "price", existing.getBasePriceEur() + (Math.random() * 10 - 5), // ±5€
                    "category", existing.getCategory(),
                    "origin", existing.getOrigin(),
                    "image", existing.getImageUrl()
                );
                dynamicData.add(modified);
            }
        }
        
        // Neue zufällige Produkte hinzufügen
        String[] newProducts = {"Seeteufel", "Steinbutt", "Wolfsbarsch", "Rotbarsch", "Makrele"};
        String[] origins = {"Nordsee", "Ostsee", "Mittelmeer", "Atlantik"};
        
        for (int i = 0; i < 2; i++) { // 2 neue Produkte
            String productName = newProducts[(int)(Math.random() * newProducts.length)];
            String origin = origins[(int)(Math.random() * origins.length)];
            
            Map<String, Object> newProduct = Map.of(
                "id", "new-" + System.currentTimeMillis() + "-" + i,
                "sku", "DYN-" + String.format("%03d", (int)(Math.random() * 999)),
                "name", productName + " Premium",
                "price", 15.0 + (Math.random() * 50), // 15-65€
                "category", getTranslation("fisch"),
                "origin", origin,
                "image", getTranslation("default.image")
            );
            dynamicData.add(newProduct);
        }
        
        return dynamicData;
    }
    
    private String getTranslation(String key) {
        try {
            java.util.Properties props = new java.util.Properties();
            props.load(getClass().getClassLoader().getResourceAsStream("ai-translations.properties"));
            return props.getProperty(key, "Fisch");
        } catch (Exception e) {
            return "Fisch";
        }
    }
    
    private String getRandomSuffix() {
        String[] suffixes = {"Premium", "Deluxe", "Royal", "Select", "Fresh", "Wild"};
        return suffixes[(int)(Math.random() * suffixes.length)];
    }
    
    private SyncChange compareProducts(Product existing, Product newProduct) {
        if (existing == null) {
            return new SyncChange("NEW", newProduct.getSku(), null, newProduct, "Neues Produkt");
        }
        
        // Preis und SKU vom bestehenden Produkt beibehalten
        newProduct.setBasePriceEur(existing.getBasePriceEur());
        newProduct.setSku(existing.getSku());
        
        List<String> differences = new ArrayList<>();
        
        if (!existing.getNameDe().equals(newProduct.getNameDe())) {
            differences.add("Name: '" + existing.getNameDe() + "' → '" + newProduct.getNameDe() + "'");
        }
        
        if (!existing.getOrigin().equals(newProduct.getOrigin())) {
            differences.add("Herkunft: '" + existing.getOrigin() + "' → '" + newProduct.getOrigin() + "'");
        }
        
        if (existing.getDescription() == null && newProduct.getDescription() != null) {
            differences.add("Beschreibung hinzugefügt (KI-generiert)");
        }
        
        if (differences.isEmpty()) {
            return null; // Keine Änderungen
        }
        
        return new SyncChange("UPDATE", newProduct.getSku(), existing, newProduct, String.join(", ", differences));
    }
    
    private ValidationResult validateProduct(Product product) {
        ValidationResult result = new ValidationResult();
        
        if (product.getBasePriceEur() <= 0) {
            result.addIssue("Ungültiger Preis: " + product.getBasePriceEur());
        }
        
        if (product.getNameDe() == null || product.getNameDe().trim().isEmpty()) {
            result.addIssue("Deutscher Name fehlt");
        }
        
        if (product.getCategory() == null || product.getCategory().trim().isEmpty()) {
            result.addIssue("Kategorie fehlt");
        }
        
        if (product.getOrigin() == null || product.getOrigin().trim().isEmpty()) {
            result.addIssue("Herkunftsangabe fehlt");
        }
        
        if (product.getNameVi() == null || product.getNameVi().trim().isEmpty()) {
            result.addIssue("Vietnamesischer Name fehlt");
        }
        
        return result;
    }
    
    private Product mapExternalToProduct(Map<String, Object> extProduct) {
        Product product = new Product();
        product.setSku((String) extProduct.get("sku"));
        product.setNameDe((String) extProduct.get("name"));
        product.setBasePriceEur(((Number) extProduct.get("price")).doubleValue());
        product.setCategory((String) extProduct.get("category"));
        product.setOrigin((String) extProduct.get("origin"));
        product.setExternalId((String) extProduct.get("id"));
        product.setImageUrl((String) extProduct.get("image"));
        product.setAvailable(true);
        return product;
    }
    
    // Klassen für Sync-Vorschau
    public static class SyncPreview {
        private List<SyncChange> changes;
        
        public SyncPreview(List<SyncChange> changes) {
            this.changes = changes;
        }
        
        public List<SyncChange> getChanges() { return changes; }
        public int getChangeCount() { return changes.size(); }
        public int getNewProductsCount() { 
            return (int) changes.stream().filter(c -> "NEW".equals(c.getType())).count(); 
        }
        public int getUpdatedProductsCount() { 
            return (int) changes.stream().filter(c -> "UPDATE".equals(c.getType())).count(); 
        }
    }
    
    public static class SyncChange {
        private String type; // NEW, UPDATE, DELETE
        private String sku;
        private Product oldProduct;
        private Product newProduct;
        private String description;
        
        public SyncChange(String type, String sku, Product oldProduct, Product newProduct, String description) {
            this.type = type;
            this.sku = sku;
            this.oldProduct = oldProduct;
            this.newProduct = newProduct;
            this.description = description;
        }
        
        public String getType() { return type; }
        public String getSku() { return sku; }
        public Product getOldProduct() { return oldProduct; }
        public Product getNewProduct() { return newProduct; }
        public String getDescription() { return description; }
    }
    
    public static class ValidationResult {
        private boolean valid = true;
        private StringBuilder issues = new StringBuilder();
        
        public void addIssue(String issue) {
            valid = false;
            if (issues.length() > 0) issues.append(", ");
            issues.append(issue);
        }
        
        public boolean isValid() { return valid; }
        public String getIssues() { return issues.toString(); }
    }
}
