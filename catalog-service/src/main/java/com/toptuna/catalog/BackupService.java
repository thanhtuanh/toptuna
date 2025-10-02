package com.toptuna.catalog;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import java.io.FileWriter;
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.ArrayList;

@Service
public class BackupService {
    
    @Value("${toptuna.backup.directory:./backups}")
    private String backupDirectory;
    
    private final ProductService productService;
    
    public BackupService(ProductService productService) {
        this.productService = productService;
    }
    
    public String createBackup() {
        try {
            // Backup-Verzeichnis erstellen falls nicht vorhanden
            Path backupPath = Paths.get(backupDirectory);
            if (!Files.exists(backupPath)) {
                Files.createDirectories(backupPath);
            }
            
            // Timestamp für Dateiname
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss"));
            String fileName = String.format("products_backup_%s.csv", timestamp);
            Path filePath = backupPath.resolve(fileName);
            
            // Aktuelle Produkte holen
            List<Product> products = productService.getAllProducts();
            
            // CSV schreiben
            try (FileWriter writer = new FileWriter(filePath.toFile())) {
                // Header
                writer.write("sku,name_de,name_en,name_vi,category,unit,base_price_eur,origin,allergens,notes,description,description_vi,description_en,image_url,available,ai_generated,external_id,last_sync\n");
                
                // Daten
                for (Product product : products) {
                    writer.write(String.format("%s,%s,%s,%s,%s,%s,%.2f,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s\n",
                        csvEscape(product.getSku()),
                        csvEscape(product.getNameDe()),
                        csvEscape(product.getNameEn()),
                        csvEscape(product.getNameVi()),
                        csvEscape(product.getCategory()),
                        csvEscape(product.getUnit()),
                        product.getBasePriceEur(),
                        csvEscape(product.getOrigin()),
                        csvEscape(product.getAllergens()),
                        csvEscape(product.getNotes()),
                        csvEscape(product.getDescription()),
                        csvEscape(product.getDescriptionVi()),
                        csvEscape(product.getDescriptionEn()),
                        csvEscape(product.getImageUrl()),
                        product.isAvailable(),
                        product.isAiGenerated(),
                        csvEscape(product.getExternalId()),
                        product.getLastSync() != null ? product.getLastSync().toString() : ""
                    ));
                }
            }
            
            System.out.println("✅ Backup erstellt: " + filePath.toString());
            return fileName; // Nur Dateiname zurückgeben
            
        } catch (IOException e) {
            System.err.println("❌ Backup-Fehler: " + e.getMessage());
            throw new RuntimeException("Backup creation failed: " + e.getMessage());
        }
    }
    
    public void restoreBackup(String fileName) {
        try {
            Path filePath = Paths.get(backupDirectory).resolve(fileName);
            if (!Files.exists(filePath)) {
                throw new RuntimeException("Backup-Datei nicht gefunden: " + fileName);
            }
            
            List<Product> restoredProducts = new ArrayList<>();
            
            try (BufferedReader reader = new BufferedReader(new FileReader(filePath.toFile()))) {
                String line = reader.readLine(); // Header überspringen
                
                while ((line = reader.readLine()) != null) {
                    String[] fields = parseCsvLine(line);
                    if (fields.length >= 8) { // Mindestfelder prüfen
                        Product product = new Product();
                        product.setSku(fields[0]);
                        product.setNameDe(fields[1]);
                        product.setNameEn(fields[2]);
                        product.setNameVi(fields[3]);
                        product.setCategory(fields[4]);
                        product.setUnit(fields[5]);
                        product.setBasePriceEur(Double.parseDouble(fields[6]));
                        product.setOrigin(fields[7]);
                        
                        if (fields.length > 8) product.setAllergens(fields[8]);
                        if (fields.length > 9) product.setNotes(fields[9]);
                        if (fields.length > 10) product.setDescription(fields[10]);
                        if (fields.length > 11) product.setDescriptionVi(fields[11]);
                        if (fields.length > 12) product.setDescriptionEn(fields[12]);
                        if (fields.length > 13) product.setImageUrl(fields[13]);
                        if (fields.length > 14) product.setAvailable(Boolean.parseBoolean(fields[14]));
                        if (fields.length > 15) product.setAiGenerated(Boolean.parseBoolean(fields[15]));
                        if (fields.length > 16) product.setExternalId(fields[16]);
                        
                        restoredProducts.add(product);
                    }
                }
            }
            
            // Alle Produkte durch wiederhergestellte ersetzen
            for (Product product : restoredProducts) {
                productService.saveProduct(product);
            }
            
            System.out.println("✅ Backup wiederhergestellt: " + fileName + " (" + restoredProducts.size() + " Produkte)");
            
        } catch (Exception e) {
            System.err.println("❌ Restore-Fehler: " + e.getMessage());
            throw new RuntimeException("Backup restore failed: " + e.getMessage());
        }
    }
    
    public List<BackupInfo> listBackups() {
        try {
            Path backupPath = Paths.get(backupDirectory);
            if (!Files.exists(backupPath)) {
                return List.of();
            }
            
            return Files.list(backupPath)
                .filter(path -> path.toString().endsWith(".csv"))
                .filter(path -> path.getFileName().toString().startsWith("products_backup_"))
                .map(path -> {
                    try {
                        String fileName = path.getFileName().toString();
                        long size = Files.size(path);
                        String timestamp = extractTimestamp(fileName);
                        return new BackupInfo(fileName, timestamp, size);
                    } catch (IOException e) {
                        return null;
                    }
                })
                .filter(info -> info != null)
                .sorted((a, b) -> b.getTimestamp().compareTo(a.getTimestamp())) // Neueste zuerst
                .toList();
                
        } catch (IOException e) {
            System.err.println("❌ Backup-Liste-Fehler: " + e.getMessage());
            return List.of();
        }
    }
    
    private String[] parseCsvLine(String line) {
        List<String> fields = new ArrayList<>();
        boolean inQuotes = false;
        StringBuilder field = new StringBuilder();
        
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            
            if (c == '"') {
                if (inQuotes && i + 1 < line.length() && line.charAt(i + 1) == '"') {
                    field.append('"');
                    i++; // Skip next quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (c == ',' && !inQuotes) {
                fields.add(field.toString());
                field = new StringBuilder();
            } else {
                field.append(c);
            }
        }
        
        fields.add(field.toString());
        return fields.toArray(new String[0]);
    }
    
    private String extractTimestamp(String fileName) {
        // products_backup_2025-10-01_12-22-30.csv -> 2025-10-01 12:22:30
        String timestamp = fileName.replace("products_backup_", "").replace(".csv", "");
        return timestamp.replace("_", " ").replace("-", "-");
    }
    
    private String csvEscape(String value) {
        if (value == null) return "";
        
        // Anführungszeichen und Kommas escapen
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            return "\"" + value.replace("\"", "\"\"") + "\"";
        }
        
        return value;
    }
    
    // Backup-Info Klasse
    public static class BackupInfo {
        private String fileName;
        private String timestamp;
        private long size;
        
        public BackupInfo(String fileName, String timestamp, long size) {
            this.fileName = fileName;
            this.timestamp = timestamp;
            this.size = size;
        }
        
        public String getFileName() { return fileName; }
        public String getTimestamp() { return timestamp; }
        public long getSize() { return size; }
        public String getFormattedSize() {
            if (size < 1024) return size + " B";
            if (size < 1024 * 1024) return String.format("%.1f KB", size / 1024.0);
            return String.format("%.1f MB", size / (1024.0 * 1024.0));
        }
    }
}
