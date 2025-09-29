#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="ops/docker-compose.yml"

case "${1:-}" in
  build)
    mvn -B -DskipTests package
    docker compose -f "$COMPOSE_FILE" build
    ;;
  logs)
    docker compose -f "$COMPOSE_FILE" logs --tail=200 "${2:-}"
    ;;
  restart)
    docker compose -f "$COMPOSE_FILE" restart "${2:-}"
    ;;
  status)
    docker compose -f "$COMPOSE_FILE" ps
    ;;
  clean)
    docker compose -f "$COMPOSE_FILE" down --volumes --remove-orphans
    docker system prune -f
    mvn clean
    ;;
  *)
    echo "Usage: $0 {build|logs [svc]|restart [svc]|status|clean}"
    ;;
esac
