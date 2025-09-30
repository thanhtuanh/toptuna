🌊 TopTuna — Konzept, Architektur & Roadmap
1. Kurzüberblick
TopTuna ist ein B2B-Portal für Fisch-Großhandel mit Fokus auf vietnamesische Restaurants. Ziel: Effiziente Verwaltung, Verkauf und operative Steuerung (Katalog, Bestellungen, Logistik, Rechnungswesen inkl. DATEV) — responsiv für Web, Tablet und Smartphone. Besonderer Schwerpunkt liegt auf der Unterstützung vietnamesischer Nutzer mit Muttersprache (Vietnamesisch).
2. Ziele (Vision)

Mächtiges Admin-Cockpit für Echtzeit-Geschäftszahlen, Lager, Lieferungen und Personal.
Käuferfreundlicher B2B-Shop (responsiv, multilingual DE/VI/EN, mit Vietnamesisch-Priorität).
KI-gestützte Tools für Marketing und Produkte (Texte, personalisierte Angebote, Prognosen).
Saubere Buchhaltung-Integration (DATEV, Lexware, Excel) mit automatisierten Erinnerungen.
DSGVO-konform und EU-rechtlich abgesichert, inkl. Nachhaltigkeits-Features.

3. Kernfunktionen (MVP → Priorität)

Authentifizierung & Rollen (ADMIN: Vollzugriff, MARKETING, DISPO, DRIVER, ACCOUNTING, CUSTOMER: Bestellverlauf).  
Produktkatalog mit Staffelpreisen, PWA-Frontend mit KI-Beschreibungen.  
Warenkorb, Bestellprozess, Order-Management.  
Logistik: Touren, Fahrer-App mit GPS-Tracking, HACCP-Checks.  
Rechnungen, persistente Buchungszeilen, DATEV-Export mit Audit-Log.  
Admin-Dashboard: Umsatz, Lager, Pünktlichkeit, ToDos (Echtzeit via WebSockets).  
KI: Produkt-Beschreibungsgenerator, Smart-Reorder, Marketing-Templates, A/B-Testing.

4. Architektur (High-level)
[Frontend PWA (Angular)]
  ↕ HTTPS
[API Gateway (Spring Cloud Gateway)]
  ↕ REST/gRPC
[Microservices (Spring Boot) per bounded context]
  - auth-service (JWT)
  - catalog-service
  - order-service
  - logistics-service (GPS-Integration)
  - crm-service
  - export-service (DATEV / Lexware / XLSX)
  - marketing-service (KI-Proxy mit ML)
  ↕
[Postgres DB(s)] (prod: one DB per service or managed instances)
  ↕
[Object Storage] (Produktbilder, Belege)
  ↕
[Monitoring / Metrics / Notifications]

5. Deployment & CI

CI: GitHub Actions (build → test → deploy).  
Prod: Render.com (render.yaml) mit Secrets (JWT_SECRET, DATABASE_URL).  
Frontend: Build-time injection von API_BASE (Gateway URL).  
DB: Postgres 15/16 (feste Major-Version), Flyway für Migrationen.

6. EU-rechtliche Anforderungen (Kurz)

DSGVO: Datenminimierung, Löschkonzepte, Einwilligungen für Marketing, Datenzugriffs-/Export-Mechanismen.  
ePrivacy / Cookies: Cookie-Banner und Consent-Management für Tracking & Newsletter.  
Buchhaltung/Steuern: Einhaltung von Fristen (z.B. UStVA), Export-Audit-Log, automatisierte Erinnerungen.  
Hinweis: Dieses README gibt Hinweise. Für verbindliche rechtliche Behandlung konsultiere einen Fachanwalt/Steuerberater.



7. Security & Operations (Essentiell)

Secrets: Nie im VCS. Nutze Render Secrets, K8s Secrets oder GitHub Secrets.  
HTTPS: Überall, HSTS am Gateway, strikte CORS-Konfiguration.  
JWT: Short-lived Tokens + Refresh, rollenbasierte Endpoint-Sicherheit.  
Backups: Tägliche DB-Backups, Disaster-Recovery-Plan.  
Observability: Actuator + Prometheus + Grafana + zentralisierte Logs.

8. UX & Accessibility

Mobile-first Design: Optimiert für Fahrer und Gastronomen (Handy/Tablet).  
Mehrsprachigkeit: DE/VI/EN mit Übersetzungs-Workflow, Priorität auf Vietnamesisch.  
WCAG 2.1: Grundlegende Konformität (Kontraste, Tastaturnavigation, Alt-Texte).

9. DATEV / Lexware / Excel Integration

DATEV: CSV-Export (Windows-1252, Semikolon), Audit-Tabelle datev_export.  
Lexware: CSV-Templates für Stammdaten und Buchungen (ggf. über DATEV).  
Excel: XLSX für manuelle Berichte (Apache POI).

10. Roadmap (Phasen)
Eine detaillierte Roadmap mit Entwicklungsschritten findest du in der todo.md.
Phase 0 — Setup (Basis)

Repository, CI, render.yaml, lokale Docker Compose (Postgres), Flyway V1 (Schema).
Basis-Frontend, Gateway, Authentifizierung.

Phase 1 — MVP Commerce & Ops

Katalog, Bestellungen, Checkout, Rechnungserstellung.
Logistik-Basics (Lieferungen, Fahrer-Markierung).
DATEV-Export (Basis), Admin-Dashboard-Grundgerüst.

Phase 2 — Stabilisierung & Security

RBAC, TLS, Secrets-Rotation, Unit-/Integrationstests, Staging-Deploy.
Observability, Backups, gehärtete DB-Migrationen.

Phase 3 — Growth & KI

KI: Produktbeschreibungen, Marketing-Vorlagen, Empfehlungen.
Admin-CMS, Terminplanung, A/B-Testing, Email/WhatsApp-Automatisierung.

Phase 4 — Scale & Compliance

Multi-Warehouse, erweiterte Routenplanung, hochverfügbare DB, gehärtete DSGVO-Prozesse.
Steuerautomatisierung (Fristen, Erinnerungen), Lexware-Integration, Buchhalter-Workflows.

11. Entwicklung / Mitwirken

Branching: main = Produktion, develop = Pre-Prod, Feature-Branches feat/*.  
Commit-Format: TYPE(scope): Kurze Zusammenfassung + refs todo#<Schritt> wenn relevant.  
Tests: Unit- und Integrationstests (Testcontainers) in CI.

12. Todo Tracking (automatisch per todo.md)
Wir nutzen die todo.md als zentrale Quelle für Entwicklungsschritte. Führe nach jedem erledigten Schritt lokal ./scripts/mark-step-done.sh <NUMMER> aus, um den Schritt als erledigt zu markieren und den Fortschritt zu aktualisieren.
13. Kontakt & Weiteres
Bei Fragen oder für Unterstützung (z.B. Migrationen, Controller, Admin-UI, KI-Proxy als Patch) kontaktiere mich. Sag mir, welche Phase oder welches Ticket du zuerst brauchst!