package com.toptuna.catalog;

import org.springframework.stereotype.Service;
import java.io.*;
import java.net.URL;
import java.nio.file.*;
import java.util.Properties;

@Service
public class AssetSyncService {
    
    private final String ASSETS_BASE_PATH = "assets/catalog-service/images/products/";
    
    public void syncProductImage(String productKey, String imageUrl) {
        try {
            // Lokalen Pfad bestimmen
            String localPath = getLocalImagePath(productKey);
            if (localPath == null) {
                localPath = ASSETS_BASE_PATH + productKey + ".jpg";
            }
            
            // Bild herunterladen wenn URL sich geändert hat
            if (imageUrl != null && imageUrl.startsWith("http")) {
                downloadImage(imageUrl, localPath);
                System.out.println("🔄 Bild aktualisiert: " + localPath);
            }
            
        } catch (Exception e) {
            System.err.println("❌ Fehler beim Sync von " + productKey + ": " + e.getMessage());
        }
    }
    
    private void downloadImage(String imageUrl, String localPath) throws IOException {
        // Ordner erstellen falls nicht vorhanden
        Path path = Paths.get(localPath);
        Files.createDirectories(path.getParent());
        
        // Bild herunterladen
        try (InputStream in = new URL(imageUrl).openStream()) {
            Files.copy(in, path, StandardCopyOption.REPLACE_EXISTING);
        }
    }
    
    private String getLocalImagePath(String key) {
        try {
            Properties props = new Properties();
            props.load(getClass().getClassLoader().getResourceAsStream("local-assets.properties"));
            return props.getProperty(key + ".image");
        } catch (Exception e) {
            return null;
        }
    }
    
    public String getLocalAssetUrl(String productKey) {
        String localPath = getLocalImagePath(productKey);
        return localPath != null ? localPath : "/assets/catalog-service/images/products/default-fish.jpg";
    }
}
