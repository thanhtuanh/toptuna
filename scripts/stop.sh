#!/bin/bash
# TopTuna B2B Portal - Stop Script

echo "🛑 Stopping TopTuna B2B Portal..."
echo "================================="

# Stop Docker Compose
echo "🔽 Stopping Docker containers..."
docker compose -f ops/docker-compose.yml down

# Clean up containers and volumes
echo "🧹 Cleaning up..."
docker compose -f ops/docker-compose.yml down --volumes --remove-orphans

# Show status
echo "📊 Container status:"
docker ps -a --filter "name=toptuna" --format "table {{.Names}}\t{{.Status}}"

echo ""
echo "✅ TopTuna B2B Portal stopped successfully!"
echo ""
echo "💡 To start again: ./scripts/start.sh"
