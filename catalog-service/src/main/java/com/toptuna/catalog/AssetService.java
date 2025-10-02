package com.toptuna.catalog;

import org.springframework.stereotype.Service;
import java.util.Properties;

@Service
public class AssetService {
    
    public enum ImageSize {
        ICON,       // 32x32 - für Icons, Navigation
        THUMBNAIL,  // 100x100 - für kleine Vorschaubilder
        LIST,       // 200x150 - für Produktlisten
        DETAIL      // 400x300 - für Produktdetails
    }
    
    public String getProductImage(String productKey, ImageSize size) {
        String key = productKey.toLowerCase() + "." + size.name().toLowerCase() + ".image";
        return getSizedAsset(key);
    }
    
    public String getCategoryImage(String categoryKey, ImageSize size) {
        String key = categoryKey.toLowerCase() + "." + size.name().toLowerCase() + ".image";
        return getSizedAsset(key);
    }
    
    public String getDefaultImage(ImageSize size) {
        String key = "default." + size.name().toLowerCase() + ".image";
        return getSizedAsset(key);
    }
    
    private String getSizedAsset(String key) {
        try {
            Properties props = new Properties();
            props.load(getClass().getClassLoader().getResourceAsStream("sized-assets.properties"));
            return props.getProperty(key, getDefaultImage(ImageSize.LIST));
        } catch (Exception e) {
            return "/assets/catalog-service/images/products/list/default.jpg";
        }
    }
    
    // Automatische Größenauswahl basierend auf Verwendung
    public String getImageForContext(String productKey, String context) {
        return switch (context.toLowerCase()) {
            case "icon", "nav", "menu" -> getProductImage(productKey, ImageSize.ICON);
            case "thumbnail", "thumb", "small" -> getProductImage(productKey, ImageSize.THUMBNAIL);
            case "list", "grid", "catalog" -> getProductImage(productKey, ImageSize.LIST);
            case "detail", "full", "large" -> getProductImage(productKey, ImageSize.DETAIL);
            default -> getProductImage(productKey, ImageSize.LIST);
        };
    }
}
