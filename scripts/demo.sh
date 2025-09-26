#!/bin/bash
# TopTuna B2B Portal - Quick Demo Script

BASE_URL="http://localhost:8080/api"

echo "🎬 TopTuna B2B Portal - Live Demo"
echo "================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🏢 TopTuna Fischgroßhandel für vietnamesische Restaurants${NC}"
echo "Sushi • Chinesisch • Thailändisch • Premium Qualität"
echo ""

echo -e "${YELLOW}1. Admin Dashboard Login${NC}"
echo "curl -X POST $BASE_URL/auth/login -d '{\"username\":\"admin\",\"password\":\"admin\"}'"
curl -s -X POST -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"admin"}' \
    "$BASE_URL/auth/login" | jq '{user, role, name}'
echo ""

echo -e "${YELLOW}2. Premium Fischkatalog (30 Produkte)${NC}"
echo "curl $BASE_URL/catalog/products"
curl -s "$BASE_URL/catalog/products" | jq -r '.[] | "\(.sku): \(.name_de) / \(.name_vi) - \(.base_price_eur)€"' | head -10
echo "... und 20 weitere Premium-Produkte"
echo ""

echo -e "${YELLOW}3. Vietnamesische Restaurant-Kunden${NC}"
echo "curl $BASE_URL/crm/customers/segments"
curl -s "$BASE_URL/crm/customers/segments" | jq -r '.Sushi[] | "🍣 \(.restaurantName) - \(.ownerName) (\(.location))"'
echo ""

echo -e "${YELLOW}4. Aktuelle Liefertouren mit HACCP${NC}"
echo "curl $BASE_URL/logistics/routes/today"
curl -s "$BASE_URL/logistics/routes/today" | jq -r '.[] | "🚚 \(.driver): \(.stops | length) Stops - \(.haccp_notes)"'
echo ""

echo -e "${YELLOW}5. Tagesgeschäft & KPIs${NC}"
echo "curl $BASE_URL/export/admin/dashboard"
curl -s "$BASE_URL/export/admin/dashboard" | jq '{tagesumsatz, offeneBestellungen, kundenGesamt, tourenAuslastung}'
echo ""

echo -e "${YELLOW}6. DATEV Export für Buchhaltung${NC}"
echo "curl $BASE_URL/export/datev/invoices?from=2024-09-01&to=2024-09-30"
curl -s "$BASE_URL/export/datev/invoices?from=2024-09-01&to=2024-09-30" | jq '{format, records, totalAmount, file}'
echo ""

echo -e "${GREEN}🎯 Demo Complete!${NC}"
echo ""
echo "📱 Frontend: http://localhost:4200"
echo "🔐 Admin Login: admin / admin"
echo "🍣 Restaurant Login: saigon_sushi / test"
echo ""
echo "🚀 Deploy to Render: ./deploy-render.sh"
