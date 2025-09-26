#!/bin/bash
# TopTuna B2B Portal - API Test Suite

BASE_URL="http://localhost:8080/api"
TOKEN=""

echo "🧪 TopTuna B2B Portal - API Test Suite"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test function
test_api() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo -e "${BLUE}Testing:${NC} $description"
    echo -e "${YELLOW}$method${NC} $BASE_URL$endpoint"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
    elif [ "$method" = "POST" ]; then
        response=$(curl -s -w "\n%{http_code}" -X POST -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$http_code" = "200" ]; then
        echo -e "${GREEN}✅ SUCCESS${NC} (HTTP $http_code)"
        echo "$body" | jq . 2>/dev/null || echo "$body"
    else
        echo -e "${RED}❌ FAILED${NC} (HTTP $http_code)"
        echo "$body"
    fi
    echo "----------------------------------------"
}

echo ""
echo "🔍 1. HEALTH CHECKS"
echo "==================="

test_api "GET" "/auth/health" "" "Auth Service Health"
test_api "GET" "/catalog/health" "" "Catalog Service Health"
test_api "GET" "/orders/health" "" "Order Service Health"
test_api "GET" "/logistics/health" "" "Logistics Service Health"
test_api "GET" "/crm/health" "" "CRM Service Health"
test_api "GET" "/export/health" "" "Export Service Health"

echo ""
echo "🔐 2. AUTHENTICATION"
echo "===================="

# Admin Login
echo -e "${BLUE}Testing:${NC} Admin Login"
login_response=$(curl -s -X POST -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"admin"}' \
    "$BASE_URL/auth/login")
echo "$login_response" | jq .

# Extract token (if jq is available)
if command -v jq &> /dev/null; then
    TOKEN=$(echo "$login_response" | jq -r '.token // empty')
fi

test_api "POST" "/auth/login" '{"username":"saigon_sushi","password":"test"}' "Restaurant Owner Login"
test_api "GET" "/auth/users" "" "Get Demo Users"

echo ""
echo "🐟 3. PRODUCT CATALOG"
echo "===================="

test_api "GET" "/catalog/products" "" "Get All Products"
test_api "GET" "/catalog/products?category=Lachs" "" "Get Salmon Products"
test_api "GET" "/catalog/products?q=Thunfisch" "" "Search Tuna Products"

echo ""
echo "📦 4. ORDER MANAGEMENT"
echo "====================="

test_api "GET" "/orders/recent" "" "Get Recent Orders"
test_api "GET" "/orders/customer/rest_001" "" "Get Customer Orders"

echo ""
echo "🚚 5. LOGISTICS & DELIVERY"
echo "=========================="

test_api "GET" "/logistics/routes/today" "" "Get Today's Routes"
test_api "GET" "/logistics/routes/route_001/packlist" "" "Get Route Packlist"

# Test delivery confirmation
test_api "POST" "/logistics/routes/route_001/stops/stop_001/deliver" \
    '{"temperature":"2°C OK","recipient":"Nguyen Van Duc"}' \
    "Confirm Delivery with HACCP"

echo ""
echo "👥 6. CRM & CUSTOMER DATA"
echo "========================"

test_api "GET" "/crm/customers/segments" "" "Get Customer Segments"
test_api "GET" "/crm/campaigns/active" "" "Get Active Campaigns"
test_api "GET" "/crm/customers/rest_001/history" "" "Get Customer History"

echo ""
echo "📊 7. EXPORT & REPORTING"
echo "========================"

test_api "GET" "/export/datev/invoices?from=2024-09-01&to=2024-09-30" "" "DATEV Invoice Export"
test_api "GET" "/export/admin/dashboard" "" "Admin Dashboard Data"

echo ""
echo "🎯 8. BUSINESS SCENARIOS"
echo "========================"

echo -e "${BLUE}Scenario:${NC} Vietnamese Restaurant Owner Workflow"
echo "1. Login → 2. Browse Products → 3. View History → 4. Check Campaigns"

# Restaurant login
restaurant_login=$(curl -s -X POST -H "Content-Type: application/json" \
    -d '{"username":"saigon_sushi","password":"test"}' \
    "$BASE_URL/auth/login")
echo "Login Response:" 
echo "$restaurant_login" | jq .

# Browse sushi products
echo -e "\n${YELLOW}Browsing Sushi Products:${NC}"
curl -s "$BASE_URL/catalog/products?category=Lachs" | jq '.[] | {sku, name_de, name_vi, base_price_eur}'

# Check customer history
echo -e "\n${YELLOW}Customer History:${NC}"
curl -s "$BASE_URL/crm/customers/rest_001/history" | jq '{totalOrders, avgOrderValue, favoriteProducts, loyaltyPoints}'

echo ""
echo "🏁 API Test Suite Complete!"
echo "==========================="
echo ""
echo "💡 Tips:"
echo "- All services should return HTTP 200"
echo "- Check Docker logs if any service fails: docker compose -f ops/docker-compose.yml logs [service]"
echo "- Frontend available at: http://localhost:4200"
echo "- Admin login: admin / admin"
