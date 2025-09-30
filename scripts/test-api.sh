#!/usr/bin/env bash
set -euo pipefail

BASE_URL="http://localhost:8080/api"
COMPOSE_FILE="ops/docker-compose.yml"

# Wait configuration (anpassbar)
WAIT_TIMEOUT=${WAIT_TIMEOUT:-180}   # Sekunden insgesamt (default 180)
WAIT_INTERVAL=${WAIT_INTERVAL:-3}   # Sekunden zwischen Checks

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Wartet, bis alle angegebenen health-endpoints HTTP 200 liefern
wait_for_health() {
    local urls=(
      "$BASE_URL/auth/health"
      "$BASE_URL/catalog/health"
      "$BASE_URL/orders/health"
      "$BASE_URL/logistics/health"
      "$BASE_URL/crm/health"
      "$BASE_URL/export/health"
    )

    echo -e "${YELLOW}Warte auf Services (timeout=${WAIT_TIMEOUT}s)...${NC}"
    local elapsed=0
    while :; do
        local all_up=true
        for u in "${urls[@]}"; do
            code=$(curl -s -o /dev/null -w "%{http_code}" "$u" || echo "000")
            if [ "$code" != "200" ]; then
                printf " %s => %s\n" "$u" "$code"
                all_up=false
            fi
        done

        if [ "$all_up" = true ]; then
            echo -e "${GREEN}Alle Services healthy.${NC}"
            return 0
        fi

        if [ "$elapsed" -ge "$WAIT_TIMEOUT" ]; then
            echo -e "${RED}Timed out nach ${WAIT_TIMEOUT}s — Services noch nicht alle healthy.${NC}"
            echo "Kurzer Status der Docker-Container (falls verfügbar):"
            docker compose -f "$COMPOSE_FILE" ps || true
            return 1
        fi

        sleep "$WAIT_INTERVAL"
        elapsed=$((elapsed + WAIT_INTERVAL))
    done
}

# Flexible test_api: 3. Parameter kann data (JSON) oder description sein.
function test_api() {
    local method=$1
    local endpoint=$2
    local third=${3:-}
    local fourth=${4:-}
    local data=""
    local desc=""

    # Entscheide ob third JSON payload ist (beginnt mit { oder [) oder Beschreibung
    if [ -n "$third" ]; then
        if [[ "${third:0:1}" == "{" || "${third:0:1}" == "[" ]]; then
            data="$third"
            desc="${fourth:-"$method $endpoint"}"
        else
            data="${fourth:-}"
            desc="$third"
        fi
    else
        desc="$method $endpoint"
    fi

    echo -e "${BLUE}Testing:${NC} $desc"
    local response
    if [ "$method" = "GET" ]; then
        response=$(curl -s -S -w "\n%{http_code}" "$BASE_URL$endpoint" || true)
    else
        response=$(curl -s -S -w "\n%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint" || true)
    fi

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d' || true)

    if [ "$http_code" = "200" ]; then
        echo -e "${GREEN}✅ SUCCESS${NC} (HTTP $http_code)"
        if command -v jq >/dev/null 2>&1; then
            echo "$body" | jq . 2>/dev/null || echo "$body"
        else
            echo "$body"
        fi
    else
        echo -e "${RED}❌ FAILED${NC} (HTTP $http_code)"
        echo "$body"
    fi
    echo "----------------------------------------"
}

echo "🧪 TopTuna B2B Portal - API Test Suite"
echo "======================================"
echo ""

# Erst warten bis Services healthy sind
if ! wait_for_health; then
    echo -e "${RED}Abbruch: nicht alle Services healthy.${NC}"
    exit 1
fi

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
