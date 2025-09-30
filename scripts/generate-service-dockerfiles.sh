#!/usr/bin/env bash
set -euo pipefail

TEMPLATE=docker/Dockerfile.maven
if [ ! -f "$TEMPLATE" ]; then
  echo "Template $TEMPLATE nicht gefunden. Bitte erstelle docker/Dockerfile.maven"
  exit 1
fi

SERVICES=( gateway auth-service catalog-service order-service logistics-service crm-service export-service )

for svc in "${SERVICES[@]}"; do
  out="${svc}/Dockerfile"
  echo "Generiere ${out} ..."
  awk -v svc="$svc" '
    BEGIN { seen=0 }
    {
      if ($0 ~ /^ARG SERVICE_DIR/ && seen==0) {
        print "ARG SERVICE_DIR=" svc
        seen=1
      } else {
        print $0
      }
    }
  ' "$TEMPLATE" > "$out"
  if ! grep -q '^ARG SERVICE_DIR' "$out"; then
    (echo "ARG SERVICE_DIR=${svc}"; cat "$out") > "${out}.tmp" && mv "${out}.tmp" "$out"
  fi
  chmod 644 "$out"
done

echo "Fertig: Dockerfiles generiert für: ${SERVICES[*]}"
