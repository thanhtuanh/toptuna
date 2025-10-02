package com.toptuna.catalog;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/catalog")
public class ProductController {
    
    private final ProductCsvLoader loader;
    private final ProductService productService;
    private final SyncService syncService;
    private final AIService aiService;
    private final BackupService backupService;
    
    public ProductController(ProductCsvLoader loader, ProductService productService, 
                           SyncService syncService, AIService aiService, BackupService backupService) {
        this.loader = loader;
        this.productService = productService;
        this.syncService = syncService;
        this.aiService = aiService;
        this.backupService = backupService;
    }
    
    @GetMapping("/products")
    public List<Product> products(@RequestParam(required=false) String q,
                                  @RequestParam(required=false) String category) {
        return loader.search(q, category);
    }
    
    @GetMapping("/products/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    
    @GetMapping("/products/{sku}")
    public Optional<Product> getProduct(@PathVariable String sku) {
        return productService.getProductBySku(sku);
    }
    
    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }
    
    // Nur für ADMIN: Import-Vorschau
    @PostMapping("/import/preview")
    public ResponseEntity<SyncService.SyncPreview> previewImport(@RequestHeader(value = "X-User-Role", required = false) String userRole) {
        if (!"ADMIN".equals(userRole)) {
            return ResponseEntity.status(403).build();
        }
        
        try {
            SyncService.SyncPreview preview = syncService.previewSync();
            return ResponseEntity.ok(preview);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    
    // Nur für ADMIN: Bestätigter Import
    @PostMapping("/import/confirm")
    public ResponseEntity<String> confirmImport(@RequestHeader(value = "X-User-Role", required = false) String userRole) {
        if (!"ADMIN".equals(userRole)) {
            return ResponseEntity.status(403).body("Nur Administratoren dürfen importieren");
        }
        
        try {
            syncService.confirmSync();
            return ResponseEntity.ok("Import erfolgreich abgeschlossen");
        } catch (Exception e) {
            System.err.println("Import error: " + e.getMessage());
            return ResponseEntity.status(500).body("Import fehlgeschlagen: " + e.getMessage());
        }
    }
    
    @PostMapping("/products/{sku}/ai-description")
    public Product generateAIDescription(@PathVariable String sku) {
        Optional<Product> productOpt = productService.getProductBySku(sku);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            String aiDescription = aiService.generateProductDescription(product);
            product.setDescription(aiDescription);
            product.setDescriptionVi(aiService.translateToVietnamese(aiDescription));
            product.setAiGenerated(true);
            return productService.saveProduct(product);
        }
        throw new RuntimeException("Product not found");
    }
    
    @GetMapping("/products/{sku}/marketing/{language}")
    public String getMarketingText(@PathVariable String sku, @PathVariable String language) {
        Optional<Product> productOpt = productService.getProductBySku(sku);
        if (productOpt.isPresent()) {
            return aiService.generateMarketingText(productOpt.get(), language);
        }
        return "Product not found";
    }
    
    // Backup-Endpoints (nur für ADMIN)
    @PostMapping("/backup")
    public ResponseEntity<String> createBackup(@RequestHeader(value = "X-User-Role", required = false) String userRole) {
        if (!"ADMIN".equals(userRole)) {
            return ResponseEntity.status(403).body("Nur Administratoren dürfen Backups erstellen");
        }
        
        try {
            String backupFile = backupService.createBackup();
            return ResponseEntity.ok("Backup erstellt: " + backupFile);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Backup-Fehler: " + e.getMessage());
        }
    }
    
    @GetMapping("/backups")
    public ResponseEntity<List<BackupService.BackupInfo>> listBackups(@RequestHeader(value = "X-User-Role", required = false) String userRole) {
        if (!"ADMIN".equals(userRole)) {
            return ResponseEntity.status(403).build();
        }
        
        try {
            List<BackupService.BackupInfo> backups = backupService.listBackups();
            return ResponseEntity.ok(backups);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    
    @PostMapping("/restore/{fileName}")
    public ResponseEntity<String> restoreBackup(@PathVariable String fileName, 
                                               @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        if (!"ADMIN".equals(userRole)) {
            return ResponseEntity.status(403).body("Nur Administratoren dürfen Backups wiederherstellen");
        }
        
        try {
            backupService.restoreBackup(fileName);
            return ResponseEntity.ok("Backup erfolgreich wiederhergestellt: " + fileName);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Restore-Fehler: " + e.getMessage());
        }
    }
    
    @PostMapping("/products/{sku}/price-tiers")
    public ResponseEntity<Product> setPriceTiers(@PathVariable String sku, @RequestBody Map<String, Double> priceTiers) {
        Optional<Product> productOpt = productService.getProductBySku(sku);
        if (productOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Product product = productOpt.get();
        product.setPriceTiers(priceTiers);
        return ResponseEntity.ok(product);
    }
    
    @PostMapping("/products/{sku}/estimated-weight")
    public ResponseEntity<Product> setEstimatedWeight(@PathVariable String sku, @RequestBody String estimatedWeight) {
        Optional<Product> productOpt = productService.getProductBySku(sku);
        if (productOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Product product = productOpt.get();
        product.setEstimatedWeight(estimatedWeight);
        return ResponseEntity.ok(product);
    }
}
