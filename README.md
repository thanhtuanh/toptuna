# 🌊 TopTuna — Konzept, Architektur & Roadmap

> **Kurzüberblick**
> TopTuna ist ein B2B-Portal für Fisch-Großhandel mit Schwerpunkt auf vietnamesischen Restaurants. Ziel ist eine effiziente, mehrsprachige (DE / VI / EN) Plattform für Katalog, Bestellungen, Logistik und Buchhaltung (inkl. DATEV). Responsiv für Web, Tablet und Smartphone — mit besonderer Priorität auf Vietnamesisch als Muttersprache für Nutzer.

---

## 🎯 1. Vision & Ziele

* Mächtiges Admin-Cockpit: Echtzeit-KPIs zu Umsatz, Bestand, Lieferperformance, Personal.
* Käuferfreundlicher B2B-Shop: PWA, Staffelpreise, schneller Wiederbestell-Flow.
* KI-gestützte Tools: Produkttexte, personalisierte Angebote, Prognosen & Smart-Reorder.
* Saubere Buchhaltungs-Integration: DATEV / Lexware / XLSX Export + Audit-Log.
* DSGVO-konform & EU-rechtlich abgesichert; Nachhaltigkeits-Features (z. B. CO₂-Tracking pro Lieferung).

---

## 🚀 2. Kernfunktionen (MVP — priorisiert)

1. **Auth & Rollen** — ADMIN, MARKETING, DISPO, DRIVER, ACCOUNTING, CUSTOMER (Bestellhistorie).
2. **Produktkatalog** — Staffelpreise, Varianten, KI-generierte Beschreibungen, Medien (S3).
3. **Warenkorb & Checkout** — Bestellmanagement, Storno/Retoure-Mechanik.
4. **Logistik (Basis)** — Lieferfenster, Touren, Fahrer-App mit GPS-Tracking + HACCP-Checks.
5. **Rechnungswesen** — Rechnungs-PDFs, persistente Buchungszeilen, DATEV-Export.
6. **Admin-Dashboard** — Umsatz, Lager, Pünktlichkeit, To-Dos (Realtime via WebSockets).
7. **KI-Features (Basis)** — Produkttext-Generator, Smart-Reorder, Marketing-Templates.

---

## 🏗️ 3. Architektur (High-level)

```
[ PWA Frontend (Angular) ]
           ↕ HTTPS
[ API Gateway (Spring Cloud Gateway) ]
           ↕ REST / gRPC
[ Microservices (Spring Boot) per Bounded Context ]
  - auth-service (JWT)
  - catalog-service
  - order-service
  - logistics-service (GPS)
  - crm-service
  - export-service (DATEV / Lexware / XLSX)
  - marketing-service (KI-Proxy / ML)
           ↕
[ Postgres DB(s) ]  (prod: managed / 1 DB pro bounded context optional)
           ↕
[ Object Storage ] (Produktbilder, Belege — S3 / MinIO)
           ↕
[ Monitoring / Metrics / Notifications ]
```

**Hinweise:** Microservices isolieren Verantwortung (bounded contexts). Verwende Flyway für DB-Migrationen, Testcontainers für Integrationstests.

---

## ⚙️ 4. Deployment & CI

* **CI**: GitHub Actions — `build → test → deploy` (Stages: build, unit/integration, security scan, deploy).
* **Prod**: Render.com (config: `render.yaml`) — Secrets via Render Secrets (z. B. `JWT_SECRET`, `DATABASE_URL`).
* **Frontend**: Build-time injection `API_BASE` (Gateway URL). PWA + Service Worker.
* **DB**: Postgres 15/16 (feste Major-Version), automatisierte Backups, Snapshots.
* **Migrations**: Flyway V1, versionierte SQL/Java Migrations.

---

## ⚖️ 5. EU-rechtliche Anforderungen (Kurz)

* **DSGVO**: Datenminimierung, Löschkonzepte, Einwilligungen (Marketing), Daten-Export & Portabilität.
* **ePrivacy / Cookies**: Consent-Management + Cookie-Banner.
* **Buchhaltung/Steuern**: Einhaltung Fristen (z. B. UStVA), Audit-Log beim DATEV-Export.

> **Disclaimer:** Dieses Dokument ist ein technischer Leitfaden — für verbindliche Rechts- oder Steuerberatung bitte Fachanwalt / Steuerberater konsultieren.

---

## 🔐 6. Security & Operations (Essentiell)

* **Secrets**: Nie im VCS. Nutze Render Secrets / K8s Secrets / GitHub Secrets.
* **HTTPS**: Gateway HSTS, strikte CORS-Policy.
* **JWT**: Short-lived Access Tokens + Refresh Tokens, RBAC an Endpoints.
* **Backups**: Tägliche DB-Backups, Offsite-Snapshots, DR-Plan.
* **Observability**: Spring Actuator + Prometheus + Grafana + zentralisierte Logs (ELK / Loki).
* **Monitoring**: Health checks, SLOs, Alerting (PagerDuty / Opsgenie optional).

---

## ♿ 7. UX & Accessibility

* **Mobile-first**: Fahrer- und Gastronomen-Centric UI (Handy/Tablet).
* **Mehrsprachigkeit**: DE / VI / EN — Übersetzungsworkflow, Priorität: VI.
* **WCAG 2.1 (Grundlagen)**: Kontraste, Tastatur-Navigation, Alt-Texte, Formulare mit klarer Fehlermeldung.

---

## 🧾 8. DATEV / Lexware / Excel Integration (Technik)

* **DATEV**: CSV Export (Windows-1252, Semikolon), strukturierte `datev_export` Tabelle, Audit-Log.
* **Lexware**: CSV Templates für Stammdaten & Buchungen (ggf. via DATEV als Zwischenschritt).
* **Excel**: XLSX Reports (Apache POI) für manuelle Auswertungen und Reports.

---

## 🗺️ 9. Roadmap (Phasen)

> Detaillierte Tasks → `todo.md`

**Phase 0 — Setup (Basis)**

* Repo Struktur, CI, `render.yaml`, lokale `docker-compose` (Postgres), Flyway V1.
* Basis-Frontend, API Gateway, Auth.

**Phase 1 — MVP Commerce & Ops**

* Produktkatalog, Bestellprozess, Checkout, Rechnungserstellung.
* Logistik-Basics (Lieferungen, Fahrer Markierung).
* DATEV-Basisexport, Admin-Dashboard Grundgerüst.

**Phase 2 — Stabilisierung & Security**

* RBAC, TLS, Secrets-Rotation, Unit/Integration Tests, Staging Deploy.
* Observability, Backups, gehärtete DB-Migrationen.

**Phase 3 — Growth & KI**

* KI: Produktbeschreibungen, Empfehlungen, Marketing-Automatisierung.
* Admin-CMS, Terminplanung, A/B-Testing, E-Mail/WhatsApp-Automation.

**Phase 4 — Scale & Compliance**

* Multi-Warehouse, erweiterte Routenplanung, hochverfügbare DB, DSGVO-härtung.
* Steuerautomatisierung (Fristen, Erinnerungen), Lexware-Deep-Integration.

---

## 🛠️ 10. Entwicklung / Mitwirken (Standards)

* **Branching**: `main` = Produktion, `develop` = Pre-Prod, Feature-Branches `feat/*`.
* **Commit-Format**: `TYPE(scope): kurze Zusammenfassung + refs todo#<NUMMER>` wenn relevant.
* **Tests**: Unit + Integration (Testcontainers) — verpflichtend in CI.
* **Code-Style**: Java: clean code, NullSafety, DTOs + Mapper, API-Contracts versionieren.

---

## ✅ 11. Todo-Tracking (todo.md)

Zentrale Quelle: `todo.md`.
Nach jedem erledigten Schritt lokal ausführen:

```bash
./scripts/mark-step-done.sh <NUMMER>
```

Das Skript markiert den Step als erledigt und aktualisiert den Fortschritt automatisch.

---

## 📞 12. Kontakt & Nächstes Vorgehen

Bei Fragen oder Unterstützung (z. B. Migrationen, Controller, Admin-UI, KI-Proxy) sag mir: **Welche Phase** oder **welches Ticket** möchtest du zuerst?
Ich kann daraus ein konkretes Sprint-Backlog (Issue-Templates + PR-Vorlage + CI-Jobs) erstellen.


