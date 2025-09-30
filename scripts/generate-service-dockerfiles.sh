#!/usr/bin/env bash
set -euo pipefail

TEMPLATE=docker/Dockerfile.maven
if [ ! -f "$TEMPLATE" ]; then
  echo "Template $TEMPLATE not found"
  exit 1
fi

# Liste der service-module (Passe Namen an deine Repo-Struktur)
SERVICES=(
  gateway
  auth-service
  catalog-service
  order-service
  logistics-service
  crm-service
  export-service
)

for svc in "${SERVICES[@]}"; do
  out="${svc}/Dockerfile"
  echo "Generating ${out} ..."
  # Schreibe eine Datei, die auf dem Template basiert, aber ARG mit default füllt
  awk -v svc="$svc" '
    BEGIN { printedARG=0 }
    {
      if($0 ~ /^ARG SERVICE_DIR/ && printedARG==0) {
        print "ARG SERVICE_DIR=" svc
        printedARG=1
      } else {
        print $0
      }
    }
  ' "$TEMPLATE" > "$out"
  # Fallback: falls kein ARG in template, prepend one
  if ! grep -q '^ARG SERVICE_DIR' "$out"; then
    (echo "ARG SERVICE_DIR=${svc}"; cat "$out") > "${out}.tmp" && mv "${out}.tmp" "$out"
  fi
  chmod 644 "$out"
done

echo "Done. Generated Dockerfiles for: ${SERVICES[*]}"
