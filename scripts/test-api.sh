#!/usr/bin/env bash
set -euo pipefail

BASE_URL="http://localhost:8080/api"
COMPOSE_FILE="ops/docker-compose.yml"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

function test_api() {
    local method=$1
    local endpoint=$2
    local data=${3:-}
    local desc=${4:-"$method $endpoint"}

    echo -e "${BLUE}Testing:${NC} $desc"
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint")
    fi

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" = "200" ]; then
        echo -e "${GREEN}✅ SUCCESS${NC} (HTTP $http_code)"
        echo "$body" | jq . 2>/dev/null || echo "$body"
    else
        echo -e "${RED}❌ FAILED${NC} (HTTP $http_code)"
        echo "$body"
    fi
    echo "----------------------------------------"
}

echo "🧪 TopTuna B2B Portal - API Test Suite"
echo "======================================"

# Health checks
test_api "GET" "/auth/health" "Auth Service Health"
test_api "GET" "/catalog/health" "Catalog Service Health"
test_api "GET" "/orders/health" "Orders Service Health"
test_api "GET" "/logistics/health" "Logistics Service Health"
test_api "GET" "/crm/health" "CRM Service Health"
test_api "GET" "/export/health" "Export Service Health"

# Auth
test_api "POST" "/auth/login" '{"username":"admin","password":"admin"}' "Admin Login"
test_api "POST" "/auth/login" '{"username":"saigon_sushi","password":"test"}' "Restaurant Login"
test_api "GET" "/auth/users" "" "List Demo Users"

# Catalog
test_api "GET" "/catalog/products" "" "Get All Products"
test_api "GET" "/catalog/products?category=Lachs" "" "Get Salmon Products"

# Orders
test_api "GET" "/orders/recent" "" "Get Recent Orders"
test_api "GET" "/orders/customer/rest_001" "" "Get Customer Orders"

# Logistics
test_api "GET" "/logistics/routes/today" "" "Get Today's Routes"
test_api "GET" "/logistics/routes/route_001/packlist" "" "Get Route Packlist"
test_api "POST" "/logistics/routes/route_001/stops/stop_001/deliver" '{"temperature":"2°C OK","recipient":"Nguyen Van Duc"}' "Confirm Delivery"

# CRM
test_api "GET" "/crm/customers/segments" "" "Get Customer Segments"
test_api "GET" "/crm/campaigns/active" "" "Get Active Campaigns"

# Export
test_api "GET" "/export/datev/invoices?from=2024-09-01&to=2024-09-30" "" "DATEV Export"
test_api "GET" "/export/admin/dashboard" "" "Admin Dashboard Data"

echo ""
echo "🏁 API Test Suite Complete!"
