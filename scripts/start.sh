#!/bin/bash
# TopTuna B2B Portal - Start Script

echo "🐟 Starting TopTuna B2B Portal..."
echo "================================="

# Build all services
echo "📦 Building all services..."
mvn -q -DskipTests package

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Start Docker Compose
echo "🚀 Starting Docker containers..."
docker compose -f ops/docker-compose.yml up --build -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 30

# Check service health
echo "🔍 Checking service health..."
services=("auth" "catalog" "orders" "logistics" "crm" "export")
all_healthy=true

for service in "${services[@]}"; do
    response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/$service/health)
    if [ "$response" = "200" ]; then
        echo "✅ $service service: HEALTHY"
    else
        echo "❌ $service service: DOWN (HTTP $response)"
        all_healthy=false
    fi
done

echo ""
if [ "$all_healthy" = true ]; then
    echo "🎉 All services are running!"
    echo ""
    echo "📋 Access Points:"
    echo "- Frontend:    http://localhost:4200"
    echo "- Gateway:     http://localhost:8080"
    echo "- Admin Login: admin / admin"
    echo ""
    echo "🧪 Run API tests: ./scripts/test-api.sh"
else
    echo "⚠️  Some services are not healthy. Check logs with:"
    echo "docker compose -f ops/docker-compose.yml logs"
fi
