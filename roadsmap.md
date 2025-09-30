# TopTuna Roadmap

Diese Roadmap basiert auf der ursprünglichen Planung aus dem README.md und integriert alle Empfehlungen aus den vorherigen Diskussionen. Sie fasst die Verbesserungen zusammen, um mehr Fische zu verkaufen (durch KI-Marketing und Personalisierung), die Verwaltung zu modernisieren (Live-Daten, DATEV-Integration, Logistik), die Benutzerfreundlichkeit zu steigern (responsive Design, multilingual mit Fokus auf Vietnamesisch) und EU-Recht einzuhalten (DSGVO, Security). Die Planung ist in Phasen unterteilt, mit Umsetzungsschritten, Prioritäten, geschätzten Zeiten (basierend auf einem kleinen Team) und Verantwortlichkeiten. Jede Phase baut auf der vorherigen auf und enthält Meilensteine für Testing und Deployment.

## Zusammenfassung aller Empfehlungen
- **Verkaufsoptimierung:** KI für personalisierte Empfehlungen, A/B-Testing, Marketing-Automatisierung (E-Mails/WhatsApp). Ziel: 20-30% Umsatzsteigerung durch datengetriebene Features.
- **Moderne Verwaltung:** Echtzeit-Dashboards für Admin (Umsatz, Lager, Logistik), automatisierte DATEV-Exports mit Reminders, GPS-Tracking in Fahrer-App.
- **Benutzerfreundlichkeit:** Mobile-first PWA, Priorisierung Vietnamesisch (VI) für Kunden, Kunden-Dashboards mit History und Filtern, WCAG-Compliance.
- **EU-Recht & Security:** Erweiterte DSGVO-Features (Datenexport, Consent-Management), HTTPS/HSTS, RBAC, Backups. Konsultation mit Anwalt/Steuerberater empfohlen.
- **Inspiration von Konkurrenz:** Integriere Features wie Incoterms (von YORSO), Nachhaltigkeits-Labels (von Deutsche See) und Lieferanten-Matching (von Torg).

**Gesamte Planung:** Budgetiere 3-6 Monate pro Phase (je nach Ressourcen). Nutze GitHub Issues für Tracking, CI/CD mit GitHub Actions. Umsetzung: Starte mit Core-Features (MVP), iteriere basierend auf User-Feedback. Teste mit vietnamesischen Nutzern für Lokalisierung.

## Phasen der Roadmap

### Phase 0: Setup (Basis) – Aktuell (1-2 Wochen)
**Ziel:** Stabile Grundlage aufbauen.
- **Umsetzungsschritte:**
  - Repo einrichten, CI/CD mit GitHub Actions (build/test/deploy).
  - Lokale Entwicklung mit Docker Compose (Postgres, Flyway-Migrationen).
  - Basic Frontend (Angular PWA), API Gateway (Spring Cloud), Auth-Service (JWT).
  - Multilingual-Setup: DE/VI/EN mit i18n-Bibliotheken (z.B. ngx-translate für Angular).
- **Empfehlungs-Integration:** Vietnamesisch als Default für neue Kunden; erste DSGVO-Checks (Cookie-Banner).
- **Meilensteine:** Erste Deployment auf Render.com; Unit-Tests für Auth.
- **Verantwortlich:** Entwickler (du/Team).

### Phase 1: MVP Commerce & Ops – Hochpriorisiert (4-6 Wochen)
**Ziel:** Kernfunktionen für Verkauf und Verwaltung live.
- **Umsetzungsschritte:**
  - Produktkatalog mit Staffelpreisen, Warenkorb, Bestellprozess (order-service).
  - Logistik-Basics: Tourenplanung, Fahrer-App mit HACCP-Checks (logistics-service).
  - Rechnungen generieren, DATEV-Export (CSV mit Audit-Log, export-service).
  - Admin-Dashboard: Skeleton mit Umsatz/Lager-Überblick (crm-service).
  - Kunden-Accounts: History mit Einkaufslisten, Filter (customer-role).
- **Empfehlungs-Integration:** Responsive Design testen (Handy/Tablet); Live-Daten via WebSockets für Lieferstatus.
- **Meilensteine:** Erster End-to-End-Test (Bestellung bis Rechnung); Staging-Deploy.
- **Verantwortlich:** Entwickler + Tester; Feedback von 2-3 Pilot-Kunden (vietnamesische Restaurants).

### Phase 2: Stabilisierung & Security – Mittelpriorisiert (3-4 Wochen)
**Ziel:** Sichere und skalierbare Basis.
- **Umsetzungsschritte:**
  - RBAC implementieren (Rollen: ADMIN full-access, CUSTOMER read-only).
  - Security: HTTPS/HSTS, CORS, JWT-Refresh, Secrets-Management.
  - Observability: Prometheus/Grafana für Metrics, tägliche Backups.
  - DSGVO-Features: Datenexport-Mechanismen, Löschkonzepte, Consent für Marketing.
- **Empfehlungs-Integration:** EU-Recht: Cookie-Banner, Einwilligungen; Integration von Steuer-Reminders (UStVA-Fristen).
- **Meilensteine:** Security-Audit (z.B. via OWASP); Full-Integration-Tests.
- **Verantwortlich:** Security-Spezialist + Entwickler; Anwalt-Konsultation für Compliance.

### Phase 3: Growth & KI – Hochpriorisiert (4-6 Wochen)
**Ziel:** Wachstum durch smarte Tools.
- **Umsetzungsschritte:**
  - KI-Features: Produkt-Beschreibungs-Generator, Smart-Reorder, Empfehlungen (marketing-service mit ML via PyTorch oder externe API).
  - Marketing: A/B-Testing, E-Mail/WhatsApp-Automatisierung, Templates in VI/DE/EN.
  - Admin-CMS: Scheduling, ToDos für Finanzen/Logistik.
- **Empfehlungs-Integration:** Personalisierte Verkaufs-Tools (Up-Selling basierend auf History); SEO-Optimierung für "vietnamesischer Fischgroßhandel".
- **Meilensteine:** KI-Prototype testen; Erste Marketing-Kampagne (z.B. Sonderangebote).
- **Verantwortlich:** KI-Entwickler + Marketing; A/B-Tests mit realen Daten.

### Phase 4: Scale & Compliance – Langfristig (6-8 Wochen)
**Ziel:** Skalierung und volle Compliance.
- **Umsetzungsschritte:**
  - Multi-Warehouse-Support, advanced Routing (GPS-Integration).
  - Tax-Automatisierung: Fristen-Reminders, Lexware-Integration.
  - High-Availability: Managed DB-Instances, Disaster-Recovery.
  - Erweiterte Features: Incoterms, Nachhaltigkeits-Labels (inspiriert von Konkurrenz).
- **Empfehlungs-Integration:** Vollständige WCAG-Compliance; User-Testing mit vietnamesischen Kunden für Benutzerfreundlichkeit.
- **Meilensteine:** Scale-Tests (z.B. 100+ Bestellungen/Tag); Zertifizierung (DSGVO-Audit).
- **Verantwortlich:** Ops-Team + Anwalt; Partnerschaften mit Lieferanten (z.B. via Torg-ähnliche Matching).

## Risiken & Mitigation
- **Risiken:** Verzögerungen durch KI-Entwicklung, Compliance-Änderungen.
- **Mitigation:** Wöchentliche Reviews; Budget für externe Hilfe (z.B. Freelancer für VI-Übersetzungen).

## Tracking & Tools
- Nutze todo.md und GitHub Issues.
- Fortschritt: Quarterly Reviews.
- Budget: Schätze 50-100k € für Phasen 0-4 (inkl. Tools/Hosting).

Diese Roadmap ist flexibel – passe sie an Feedback an. Viel Erfolg!

---
