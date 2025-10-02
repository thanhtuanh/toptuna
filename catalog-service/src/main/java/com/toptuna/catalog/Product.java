package com.toptuna.catalog;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.HashMap;
import com.fasterxml.jackson.annotation.JsonInclude;

public class Product {
    private String sku;
    private String nameDe;
    private String nameEn;
    private String nameVi;
    private String category;
    private String unit;
    private double basePriceEur;
    private String origin;
    private String allergens;
    private String notes;
    private String description;
    private String descriptionVi;
    private String descriptionEn;
    private String imageUrl;
    private boolean available;
    private String externalId; // toptuna.de ID
    private LocalDateTime lastSync;
    private boolean aiGenerated;
    
    // Preisstufen
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private Map<String, Double> priceTiers;
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private String estimatedWeight;
    
    public Product() {
        this.priceTiers = new HashMap<>();
    }
    
    public Product(String sku, String nameDe, String nameEn, String nameVi, String category,
                   String unit, double basePriceEur, String origin, String allergens, String notes) {
        this.sku = sku;
        this.nameDe = nameDe;
        this.nameEn = nameEn;
        this.nameVi = nameVi;
        this.category = category;
        this.unit = unit;
        this.basePriceEur = basePriceEur;
        this.origin = origin;
        this.allergens = allergens;
        this.notes = notes;
        this.available = true;
        this.lastSync = LocalDateTime.now();
        this.priceTiers = new HashMap<>();
    }
    
    // Getters and Setters
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    
    public String getNameDe() { return nameDe; }
    public void setNameDe(String nameDe) { this.nameDe = nameDe; }
    
    public String getNameEn() { return nameEn; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }
    
    public String getNameVi() { return nameVi; }
    public void setNameVi(String nameVi) { this.nameVi = nameVi; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    
    public double getBasePriceEur() { return basePriceEur; }
    public void setBasePriceEur(double basePriceEur) { this.basePriceEur = basePriceEur; }
    
    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }
    
    public String getAllergens() { return allergens; }
    public void setAllergens(String allergens) { this.allergens = allergens; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getDescriptionVi() { return descriptionVi; }
    public void setDescriptionVi(String descriptionVi) { this.descriptionVi = descriptionVi; }
    
    public String getDescriptionEn() { return descriptionEn; }
    public void setDescriptionEn(String descriptionEn) { this.descriptionEn = descriptionEn; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    
    public String getExternalId() { return externalId; }
    public void setExternalId(String externalId) { this.externalId = externalId; }
    
    public LocalDateTime getLastSync() { return lastSync; }
    public void setLastSync(LocalDateTime lastSync) { this.lastSync = lastSync; }
    
    public boolean isAiGenerated() { return aiGenerated; }
    public void setAiGenerated(boolean aiGenerated) { this.aiGenerated = aiGenerated; }
    
    public Map<String, Double> getPriceTiers() { return priceTiers; }
    public void setPriceTiers(Map<String, Double> priceTiers) { this.priceTiers = priceTiers; }
    
    public String getEstimatedWeight() { return estimatedWeight; }
    public void setEstimatedWeight(String estimatedWeight) { this.estimatedWeight = estimatedWeight; }
}
