#!/usr/bin/env bash
set -euo pipefail

BASE_URL="http://localhost:8080/api"
COMPOSE_FILE="ops/docker-compose.yml"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🎬 TopTuna B2B Portal - Live Demo"
echo "================================="
echo ""

# Ensure gateway is up
code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/auth/health" || echo "000")
if [ "$code" != "200" ]; then
  echo -e "${YELLOW}Gateway not healthy (or stack not running). I'll try to start the stack...${NC}"
  ./scripts/start.sh
fi

echo -e "${BLUE}🏢 TopTuna Fischgroßhandel${NC}"
echo "Sushi • Chinesisch • Thailändisch • Premium Qualität"
echo ""

echo -e "${YELLOW}1. Admin Dashboard Login${NC}"
curl -s -X POST -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"admin"}' \
    "$BASE_URL/auth/login" | jq '{user, role, name}' || echo "(no JSON response)"
echo ""

echo -e "${YELLOW}2. Premium Fischkatalog (erste 10 von ~30)${NC}"
curl -s "$BASE_URL/catalog/products" | jq -r '.[] | "\(.sku): \(.name_de) / \(.name_vi) - \(.base_price_eur)€"' | head -10
echo "... und weitere Premium-Produkte"
echo ""

echo -e "${YELLOW}3. Vietnamesische Restaurant-Kunden (Segment-Beispiel)${NC}"
curl -s "$BASE_URL/crm/customers/segments" | jq -r 'to_entries[] | "\(.key): \(.value | length) customers"'
echo ""

echo -e "${YELLOW}4. Aktuelle Liefertouren mit HACCP${NC}"
curl -s "$BASE_URL/logistics/routes/today" | jq -r '.[] | "🚚 \(.driver): \(.stops | length) Stops - \(.haccp_notes // \"no notes\")"' || echo "(no routes)"
echo ""

echo -e "${YELLOW}5. Tagesgeschäft & KPIs${NC}"
curl -s "$BASE_URL/export/admin/dashboard" | jq '{tagesumsatz, offeneBestellungen, kundenGesamt, tourenAuslastung}' || echo "(no dashboard)"
echo ""

echo -e "${YELLOW}6. DATEV Export-Beispiel${NC}"
curl -s "$BASE_URL/export/datev/invoices?from=2024-09-01&to=2024-09-30" | jq '{format, records, totalAmount, file}' || echo "(no datev)"
echo ""

echo -e "${GREEN}🎯 Demo Complete!${NC}"
echo ""
echo "📱 Frontend: http://localhost:4200"
echo "🔐 Admin Login: admin / admin"
echo "🍣 Restaurant Login: saigon_sushi / test"
echo ""
