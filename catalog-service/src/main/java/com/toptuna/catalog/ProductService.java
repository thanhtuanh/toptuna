package com.toptuna.catalog;

import org.springframework.stereotype.Service;
import org.springframework.core.io.ClassPathResource;
import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class ProductService {
    
    private final Map<String, Product> products = new ConcurrentHashMap<>();
    
    @PostConstruct
    public void initDemoProducts() {
        loadProductsFromCsv();
    }
    
    private void loadProductsFromCsv() {
        try {
            ClassPathResource resource = new ClassPathResource("demo-products.csv");
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
                
                String line = reader.readLine(); // Skip header
                while ((line = reader.readLine()) != null) {
                    String[] fields = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
                    if (fields.length >= 12) {
                        Product product = createProductFromCsvFields(fields);
                        products.put(product.getSku(), product);
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error loading demo products: " + e.getMessage());
        }
    }
    
    private Product createProductFromCsvFields(String[] fields) {
        Product product = new Product(
            fields[0], // sku
            fields[1], // nameDe
            fields[2], // nameEn
            fields[3], // nameVi
            fields[4], // category
            fields[5], // unit
            Double.parseDouble(fields[6]), // price
            fields[7], // origin
            "", // supplier
            fields[1] // displayName
        );
        
        product.setDescription(fields[8]);
        product.setDescriptionVi(fields[9]);
        product.setImageUrl(fields[10]);
        if (fields.length > 11 && !fields[11].isEmpty()) {
            product.setEstimatedWeight(fields[11]);
        }
        if (fields.length > 12 && !fields[12].isEmpty()) {
            product.setPriceTiers(parsePriceTiers(fields[12]));
        }
        product.setAiGenerated(true);
        
        return product;
    }
    
    private Map<String, Double> parsePriceTiers(String priceTiersStr) {
        Map<String, Double> priceTiers = new HashMap<>();
        if (priceTiersStr != null && !priceTiersStr.isEmpty()) {
            String[] tiers = priceTiersStr.split(",");
            for (String tier : tiers) {
                String[] parts = tier.split(":");
                if (parts.length == 2) {
                    priceTiers.put(parts[0], Double.parseDouble(parts[1]));
                }
            }
        }
        return priceTiers;
    }
    
    public List<Product> getAllProducts() {
        return new ArrayList<>(products.values());
    }
    
    public Optional<Product> getProductBySku(String sku) {
        return Optional.ofNullable(products.get(sku));
    }
    
    public Product saveProduct(Product product) {
        if (product.getSku() == null) {
            product.setSku("SKU-" + System.currentTimeMillis());
        }
        product.setLastSync(LocalDateTime.now());
        products.put(product.getSku(), product);
        return product;
    }
    
    public List<Product> getProductsByCategory(String category) {
        return products.values().stream()
                .filter(p -> category.equals(p.getCategory()))
                .toList();
    }
    
    public List<Product> searchProducts(String query) {
        String lowerQuery = query.toLowerCase();
        return products.values().stream()
                .filter(p -> 
                    (p.getNameDe() != null && p.getNameDe().toLowerCase().contains(lowerQuery)) ||
                    (p.getNameVi() != null && p.getNameVi().toLowerCase().contains(lowerQuery)) ||
                    (p.getNameEn() != null && p.getNameEn().toLowerCase().contains(lowerQuery))
                )
                .toList();
    }
    
    public void deleteProduct(String sku) {
        products.remove(sku);
    }
}
