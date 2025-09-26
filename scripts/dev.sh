#!/bin/bash
# TopTuna B2B Portal - Development Helper

echo "🛠️  TopTuna Development Helper"
echo "============================="

case "$1" in
    "build")
        echo "📦 Building all services..."
        mvn clean package -DskipTests
        ;;
    "logs")
        service=${2:-""}
        if [ -z "$service" ]; then
            echo "📋 All service logs:"
            docker compose -f ops/docker-compose.yml logs --tail=50
        else
            echo "📋 Logs for $service:"
            docker compose -f ops/docker-compose.yml logs --tail=50 $service
        fi
        ;;
    "restart")
        service=${2:-""}
        if [ -z "$service" ]; then
            echo "🔄 Restarting all services..."
            docker compose -f ops/docker-compose.yml restart
        else
            echo "🔄 Restarting $service..."
            docker compose -f ops/docker-compose.yml restart $service
        fi
        ;;
    "status")
        echo "📊 Service Status:"
        docker compose -f ops/docker-compose.yml ps
        echo ""
        echo "🔍 Health Checks:"
        services=("auth" "catalog" "orders" "logistics" "crm" "export")
        for service in "${services[@]}"; do
            response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/$service/health)
            if [ "$response" = "200" ]; then
                echo "✅ $service: HEALTHY"
            else
                echo "❌ $service: DOWN"
            fi
        done
        ;;
    "clean")
        echo "🧹 Cleaning up..."
        docker compose -f ops/docker-compose.yml down --volumes --remove-orphans
        docker system prune -f
        mvn clean
        ;;
    *)
        echo "Usage: $0 {build|logs|restart|status|clean}"
        echo ""
        echo "Commands:"
        echo "  build          - Build all Maven services"
        echo "  logs [service] - Show logs (all or specific service)"
        echo "  restart [svc]  - Restart services (all or specific)"
        echo "  status         - Show service status and health"
        echo "  clean          - Clean up containers and build artifacts"
        echo ""
        echo "Examples:"
        echo "  $0 build"
        echo "  $0 logs gateway"
        echo "  $0 restart auth"
        echo "  $0 status"
        ;;
esac
