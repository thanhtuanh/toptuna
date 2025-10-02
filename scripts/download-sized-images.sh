#!/bin/bash

echo "📥 Lade Bilder in verschiedenen Größen herunter..."

# Produktbilder in verschiedenen Größen
declare -A products=(
    ["salmon"]="https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6"
    ["tuna"]="https://images.unsplash.com/photo-1544943910-4c1dc44aab44"
    ["shrimp"]="https://images.unsplash.com/photo-1565680018434-b513d5e5fd47"
    ["cod"]="https://images.unsplash.com/photo-1544551763-46a013bb70d5"
    ["seabream"]="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c"
    ["crab"]="https://images.unsplash.com/photo-1580476262798-bddd9f4b7369"
    ["squid"]="https://images.unsplash.com/photo-1559827260-dc66d52bef19"
)

for product in "${!products[@]}"; do
    base_url="${products[$product]}"
    
    echo "📸 Lade $product in verschiedenen Größen..."
    
    # Icons (32x32)
    curl -o "assets/catalog-service/images/products/icons/${product}.jpg" "${base_url}?w=32&h=32&fit=crop"
    
    # Thumbnails (100x100) - für Listen
    curl -o "assets/catalog-service/images/products/thumbnails/${product}.jpg" "${base_url}?w=100&h=100&fit=crop"
    
    # List (200x150) - für Produktlisten
    curl -o "assets/catalog-service/images/products/list/${product}.jpg" "${base_url}?w=200&h=150&fit=crop"
    
    # Detail (400x300) - für Produktdetails
    curl -o "assets/catalog-service/images/products/detail/${product}.jpg" "${base_url}?w=400&h=300&fit=crop"
done

# Default-Bilder
echo "📸 Lade Default-Bilder..."
default_url="https://images.unsplash.com/photo-1544943910-4c1dc44aab44"

curl -o "assets/catalog-service/images/products/icons/default.jpg" "${default_url}?w=32&h=32&fit=crop"
curl -o "assets/catalog-service/images/products/thumbnails/default.jpg" "${default_url}?w=100&h=100&fit=crop"
curl -o "assets/catalog-service/images/products/list/default.jpg" "${default_url}?w=200&h=150&fit=crop"
curl -o "assets/catalog-service/images/products/detail/default.jpg" "${default_url}?w=400&h=300&fit=crop"

# Kategorie-Bilder
echo "📸 Lade Kategorie-Bilder..."
fish_url="https://images.unsplash.com/photo-1544943910-4c1dc44aab44"
seafood_url="https://images.unsplash.com/photo-1565680018434-b513d5e5fd47"

# Fisch-Kategorie
curl -o "assets/catalog-service/images/categories/icons/fish.jpg" "${fish_url}?w=32&h=32&fit=crop"
curl -o "assets/catalog-service/images/categories/thumbnails/fish.jpg" "${fish_url}?w=100&h=100&fit=crop"
curl -o "assets/catalog-service/images/categories/list/fish.jpg" "${fish_url}?w=200&h=150&fit=crop"
curl -o "assets/catalog-service/images/categories/detail/fish.jpg" "${fish_url}?w=400&h=300&fit=crop"

# Meeresfrüchte-Kategorie
curl -o "assets/catalog-service/images/categories/icons/seafood.jpg" "${seafood_url}?w=32&h=32&fit=crop"
curl -o "assets/catalog-service/images/categories/thumbnails/seafood.jpg" "${seafood_url}?w=100&h=100&fit=crop"
curl -o "assets/catalog-service/images/categories/list/seafood.jpg" "${seafood_url}?w=200&h=150&fit=crop"
curl -o "assets/catalog-service/images/categories/detail/seafood.jpg" "${seafood_url}?w=400&h=300&fit=crop"

echo "✅ Alle Bilder in verschiedenen Größen heruntergeladen!"
