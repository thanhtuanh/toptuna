#!/bin/bash

# Assets-Ordner erstellen
mkdir -p assets/catalog-service/images/products
mkdir -p assets/catalog-service/images/categories
mkdir -p assets/catalog-service/images/logos

# Produktbilder herunterladen
echo "📥 Lade Produktbilder herunter..."

# Lachs/Salmon
curl -o "assets/catalog-service/images/products/salmon.jpg" "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=300&fit=crop"

# Thunfisch/Tuna
curl -o "assets/catalog-service/images/products/tuna.jpg" "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop"

# Garnelen/Shrimp
curl -o "assets/catalog-service/images/products/shrimp.jpg" "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop"

# Kabeljau/Cod
curl -o "assets/catalog-service/images/products/cod.jpg" "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"

# Dorade/Sea Bream
curl -o "assets/catalog-service/images/products/seabream.jpg" "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=300&fit=crop"

# Krabben/Crab
curl -o "assets/catalog-service/images/products/crab.jpg" "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400&h=300&fit=crop"

# Tintenfisch/Squid
curl -o "assets/catalog-service/images/products/squid.jpg" "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"

# Default Fisch
curl -o "assets/catalog-service/images/products/default-fish.jpg" "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop"

echo "✅ Produktbilder heruntergeladen"

# Kategorie-Bilder
echo "📥 Lade Kategorie-Bilder herunter..."
curl -o "assets/catalog-service/images/categories/fish.jpg" "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop"
curl -o "assets/catalog-service/images/categories/seafood.jpg" "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop"

echo "✅ Alle Bilder erfolgreich heruntergeladen!"
