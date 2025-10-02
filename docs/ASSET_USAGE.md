# 📸 Asset-Verwendung nach Größen

## 🎯 Verwendungszwecke

### 🔸 **Icons (32x32px)**
- **Verwendung**: Navigation, Menüs, kleine Buttons
- **Pfad**: `/assets/catalog-service/images/products/icons/`
- **Beispiel**: `salmon.jpg`, `tuna.jpg`

### 🔸 **Thumbnails (100x100px)**  
- **Verwendung**: Kleine Vorschaubilder, Warenkorb
- **Pfad**: `/assets/catalog-service/images/products/thumbnails/`
- **Beispiel**: Warenkorb-Artikel, Mini-Galerie

### 🔸 **List (200x150px)**
- **Verwendung**: Produktlisten, Katalog-Grid
- **Pfad**: `/assets/catalog-service/images/products/list/`
- **Beispiel**: Hauptkatalog, Suchergebnisse

### 🔸 **Detail (400x300px)**
- **Verwendung**: Produktdetailseiten, große Ansichten
- **Pfad**: `/assets/catalog-service/images/products/detail/`
- **Beispiel**: Produktdetailseite, Zoom-Ansicht

## 🛠️ Backend-Verwendung

```java
@Autowired
private AssetService assetService;

// Spezifische Größe
String iconUrl = assetService.getProductImage("lachs", ImageSize.ICON);
String detailUrl = assetService.getProductImage("lachs", ImageSize.DETAIL);

// Automatische Größenauswahl
String listImage = assetService.getImageForContext("lachs", "catalog");
String thumbImage = assetService.getImageForContext("lachs", "thumbnail");
```

## 🎨 Frontend-Verwendung

```typescript
import { AssetService, ImageSize } from './config/sized-assets.config';

// Spezifische Größe
const iconUrl = AssetService.getProductImage('lachs', ImageSize.ICON);
const detailUrl = AssetService.getProductImage('lachs', ImageSize.DETAIL);

// Kontext-basiert
const listImage = AssetService.getImageForContext('lachs', 'catalog');
const thumbImage = AssetService.getImageForContext('lachs', 'thumbnail');
```

## 📁 Ordnerstruktur

```
assets/catalog-service/images/
├── products/
│   ├── icons/          # 32x32px - Navigation, Menüs
│   ├── thumbnails/     # 100x100px - Kleine Vorschau
│   ├── list/          # 200x150px - Produktlisten
│   └── detail/        # 400x300px - Detailansichten
├── categories/
│   ├── icons/         # Kategorie-Icons
│   ├── thumbnails/    # Kategorie-Thumbnails
│   ├── list/         # Kategorie-Listen
│   └── detail/       # Kategorie-Details
└── logos/
    ├── small/        # Kleine Logos
    ├── medium/       # Mittlere Logos
    └── large/        # Große Logos
```

## 🔄 Automatisches Sync

Das System lädt automatisch neue Bilder in allen Größen herunter:
- Neue Produkte → Alle 4 Größen werden generiert
- Bild-Updates → Bestehende Bilder werden ersetzt
- Fallback → Default-Bilder in entsprechender Größe
