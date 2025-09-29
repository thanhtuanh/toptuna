#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="ops/docker-compose.yml"
echo "🐟 Starting TopTuna B2B Portal..."
echo "================================="

# build backend jars locally first (recommended, speeds up Docker builds)
echo "📦 Building Maven multi-module (local) -- skip tests"
mvn -B -DskipTests package

echo "📦 Building images via docker compose (BuildKit recommended)"
export DOCKER_BUILDKIT=1

# Build all images (no cache recommended on first run)
docker compose -f "$COMPOSE_FILE" build --progress=plain

echo "🚀 Bringing up containers"
docker compose -f "$COMPOSE_FILE" up -d

echo "⏳ Wait a bit for services to start..."
sleep 5

echo "🔍 Checking gateway health (via container healthcheck)"
docker compose -f "$COMPOSE_FILE" ps

echo "➡️ View logs: docker compose -f $COMPOSE_FILE logs -f gateway"
