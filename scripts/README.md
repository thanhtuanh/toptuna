## 🚀 Quick Start (aktualisiert)

### `./scripts/start.sh`
Startet die gesamte Plattform:
- Baut Images mit BuildKit (`docker/Dockerfile.maven`)
- Startet `docker compose up -d` (Compose-file: `ops/docker-compose.yml`)
- Führt Health-Checks durch (via Gateway)

### `./scripts/stop.sh`
Stoppt Compose-Stack und bereinigt Volumes.

### `./scripts/dev.sh`
Entwickler-Helfer:
- `./scripts/dev.sh build` — baut alle Services (oder `./scripts/dev.sh build auth` für ein einzelnes)
- `./scripts/dev.sh logs gateway` — Logs
- `./scripts/dev.sh status` — ps + Healthchecks via Gateway

### `./scripts/test-api.sh`
Automatisierte API-Checks über das Gateway (`http://localhost:8080/api/...`).

### Hinweise
- Stelle sicher, dass `.dockerignore` im Repo-Root liegt, um großen Build-Context zu vermeiden.
- Benutze `DOCKER_BUILDKIT=1` für schnelleres, cache-basiertes Bauen.
- Wenn Builds fehlschlagen, prüfe Logs: `docker compose -f ops/docker-compose.yml logs <service>`.
