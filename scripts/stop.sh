#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="ops/docker-compose.yml"
echo "🛑 Stopping TopTuna B2B Portal..."
docker compose -f "$COMPOSE_FILE" down --volumes --remove-orphans
echo "✅ Stopped and cleaned."
