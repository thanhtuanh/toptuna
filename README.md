
# TopTuna — Konzept, Architektur & Roadmap

## 1. Kurzüberblick
TopTuna ist ein B2B-Portal für Fisch-Großhandel mit Fokus auf vietnamesische Restaurants. Ziel: Verwaltung, Verkauf und operative Steuerung (Katalog, Bestellungen, Logistik, Rechnungswesen inkl. DATEV) — responsiv für Web/Tablet/Smartphone.

## 2. Ziele (Vision)
- Mächtiges Admin-Cockpit für Geschäftszahlen, Lager, Lieferungen und Personal.
- Käuferfreundlicher B2B-Shop (responsive, multilingual DE/VI/EN).
- KI-gestützte Marketing- und Produkt-Tools (Texte, Angebote, Prognosen).
- Saubere Buchhaltung-Integration (DATEV, Lexware, Excel).
- DSGVO-konform und EU-rechtlich abgesichert.

## 3. Kernfunktionen (MVP → Priorität)
1. Auth & Rollen (ADMIN, MARKETING, DISPO, DRIVER, ACCOUNTING, CUSTOMER).  
2. Produktkatalog mit Staffelpreisen, PWA-Frontend.  
3. Warenkorb, Bestellprozess, Order-Management.  
4. Logistics: Touren, Fahrer-App, HACCP-Checks.  
5. Rechnungen, persistente Buchungszeilen, DATEV-Export.  
6. Admin-Dashboard: Umsatz, Lager, Pünktlichkeit, ToDos.  
7. KI: Produkt-Beschreibungsgenerator, Smart-Reorder, Marketing-Templates.

## 4. Architektur (High-level)

  [Frontend PWA (Angular)]
  ↕ HTTPS
  [API Gateway (Spring Cloud Gateway)]
  ↕ REST/gRPC
  [Microservices (Spring Boot) per bounded context]

  auth-service (JWT)

  catalog-service

  order-service

  logistics-service

  crm-service

  export-service (DATEV / Lexware / XLSX)

  marketing-service (KI-proxy)
  ↕
  [Postgres DB(s)] (prod: one DB per service or managed DB instances)
  ↕
  [Object Storage] (Produktbilder, Belege)
  ↕
  [Monitoring / Metrics / Notifications]
## 5. Deployment & CI
- CI: GitHub Actions (build → test → deploy).  
- Prod: Render.com (render.yaml) mit Secrets (JWT_SECRET, DATABASE_URL).  
- Frontend: build-time injection `API_BASE` (Gateway URL).  
- DB: Postgres 15/16 (pin Major-Version), Flyway für Migrationen.

## 6. EU-rechtliche Anforderungen (Kurz)
- **DSGVO**: Datenminimierung, Löschkonzepte, Einwilligungen für Marketing, Datenzugriffs-/Export-Mechanismen für Betroffene.  
- **ePrivacy / Cookies**: Cookie-Banner / Consent-Management für Tracking & Newsletter.  
- **Buchhaltung/Steuern**: Fristen (UStVA etc.) beachten und Export-Audit loggen.  
> Hinweis: Das README gibt Hinweise — für verbindliche rechtliche Behandlung empfehle ich Rücksprache mit einem Fachanwalt / Steuerberater.

## 7. Security & Operations (Essentiell)
- Secrets niemals im VCS. Nutze Render Secrets / K8s Secrets / GitHub Secrets.  
- HTTPS überall, HSTS am Gateway, CORS eng konfigurieren.  
- JWT short-lived + Refresh, rollenbasierte Endpoint-Security.  
- Backups: tägliche DB-Backups, Disaster-Recovery plan.  
- Observability: Actuator + Prometheus + Grafana + Zentral-Logs.

## 8. UX & Accessibility
- Mobile-first Design (Telefon für Fahrer & Gastronomen).  
- Mehrsprachigkeit (DE/VI/EN) mit Übersetzungs-Workflow.  
- WCAG 2.1 Basic Compliance: Kontraste, Keyboard-Navigation, Alt-Texte.

## 9. DATEV / Lexware / Excel Integration
- DATEV: CSV-Export (Windows-1252, Semikolon), Audit-Tabelle `datev_export`.  
- Lexware: CSV-Templates für Stammdaten + Buchungen (falls nötig via DATEV).  
- Excel (XLSX) für manuelle Reports (Apache POI).

## 10. Roadmap (Phasen)
### Phase 0 — Setup (Basis)
- Repo, CI, render.yaml, lokale Docker Compose (Postgres), Flyway V1 (Schema)
- Frontend basic, Gateway, Auth

### Phase 1 — MVP Commerce & Ops
- Catalog, Orders, Checkout, Invoice generation
- Logistics basic (deliveries, driver marking)
- DATEV export basic, Admin Dashboard skeleton

### Phase 2 — Stabilisierung & Security
- RBAC, TLS, secret rotation, unit/integration tests, staging deploy
- Observability, backups, DB migrations hardened

### Phase 3 — Growth & KI
- KI: product description generator, marketing templates, recommendations
- Admin CMS + scheduling, A/B testing, email/WhatsApp automation

### Phase 4 — Scale & Compliance
- Multi-warehouse, advanced routing, high-availability DB, hardened GDPR processes
- Tax automation (deadlines, reminders), Lexware integrations, accountant workflows

## 11. Entwicklung / How to contribute
- Branching: `main` = prod, `develop` = pre-prod, feature branches `feat/*`.  
- Commit-Format: `TYPE(scope): short summary` + `refs todo#<step>` wenn relevant.  
- Tests: Unit + Integration (Testcontainers) in CI.

## 12. Todo Tracking (automatisch per todo.md)
Wir nutzen `todo.md` als single-source-of-truth für Schritte. Nach jedem erledigten Step kann man lokal `./scripts/mark-step-done.sh <NUMMER>` ausführen, um Schritt als erledigt zu markieren und Fortschritt oben zu aktualisieren.

## 13. Kontakt & Weiteres
Bei Fragen oder wenn du möchtest, kann ich die Migrationen, Controller, Admin-UI und das KI-Proxy direkt als Patch generieren — sage mir welche Phase oder welches Ticket du zuerst willst.
