🌊 TopTuna Aufgabenliste
Diese Datei dient als zentrale Quelle zur Verfolgung der Entwicklungsschritte für TopTuna, ein B2B-Portal für Fisch-Großhandel, speziell für vietnamesische Restaurants. Führe ./scripts/mark-step-done.sh <NUMMER> lokal aus, um einen Schritt als erledigt zu markieren. Der Fortschritt wird automatisch aktualisiert und protokolliert.

📋 Fortschrittsübersicht
Fortschritt: 0/23 Schritte abgeschlossen (Wird automatisch über ./scripts/update-todo.sh aktualisiert)

🚀 Phase 0: Setup (Basis)
Aufbau der grundlegenden Infrastruktur und Tools für TopTuna.



Schritt
Beschreibung
Priorität
Zeit
Phase



1
Repository initialisieren, render.yaml & CI (GitHub Actions) — Basis-Build-Pipeline mit Unit-Tests.
Hoch
2 Tage
Phase 0


2
Docker Compose (Postgres 15/16) + Flyway V1 Schema (Produkte, Kunden, Bestellungen, Rollen).
Hoch
3 Tage
Phase 0


3
Gateway (Spring Cloud) + Authentifizierung (JWT) + Rollen (ADMIN, CUSTOMER).
Hoch
4 Tage
Phase 0


4
Mehrsprachigkeit einrichten (DE/VI/EN, ngx-translate) mit Priorität auf Vietnamesisch für vietnamesische Nutzer.
Mittel
3 Tage
Phase 0



🛒 Phase 1: MVP Commerce & Betrieb
Entwicklung der Kernfunktionen für Handel und operative Abläufe.



Schritt
Beschreibung
Priorität
Zeit
Phase



5
Frontend PWA (Angular) — Produktliste, Produktseite, Warenkorb (responsiv für Mobile/Tablet).
Hoch
7 Tage
Phase 1


6
Order-Service — Checkout, Bestellungsspeicherung, Kundenverlauf mit Filtern.
Hoch
6 Tage
Phase 1


7
Logistics-Service — Liefertouren, Fahrer-App mit Liefermarkierung, HACCP-Prüfungen.
Hoch
5 Tage
Phase 1


8
Rechnungserstellung + Buchungszeilen-Speicherung, DATEV-CSV-Export (Windows-1252, Audit-Log).
Hoch
5 Tage
Phase 1


9
Admin-Dashboard-Grundgerüst — KPIs (Umsatz, Lager), Lagerübersicht, WebSocket-Echtzeit-Updates.
Hoch
6 Tage
Phase 1


10
Kunden-Dashboard — Bestellverlauf, herunterladbare Berichte (Excel/PDF).
Mittel
4 Tage
Phase 1



🔒 Phase 2: Stabilisierung & Sicherheit
Sicherstellung eines sicheren und rechtskonformen Systems.



Schritt
Beschreibung
Priorität
Zeit
Phase



11
Sicherheitsmaßnahmen — HTTPS/HSTS, CORS, JWT-Refresh, Secrets-Rotation (Render Secrets).
Hoch
4 Tage
Phase 2


12
DSGVO-Compliance — Datenminimierung, Löschkonzepte, API für Datenzugriff/Export, Cookie-Zustimmung.
Hoch
5 Tage
Phase 2


13
Tests — Unit- und Integrationstests mit Testcontainers, WCAG 2.1 Konformität (Kontraste, Tastaturnavigation).
Mittel
5 Tage
Phase 2


14
Observability — Prometheus/Grafana für Metriken, tägliche DB-Backups, zentralisierte Logs.
Mittel
4 Tage
Phase 2



📈 Phase 3: Wachstum & KI
Steigerung von Umsatz und Engagement durch KI-gestützte Tools und Marketing.



Schritt
Beschreibung
Priorität
Zeit
Phase



15
KI-Marketing — Generator für Produktbeschreibungen (Backend-Proxy, z.B. PyTorch), A/B-Testing.
Hoch
7 Tage
Phase 3


16
Personalisierte Empfehlungen & Smart-Reorder basierend auf Bestellverlauf.
Hoch
6 Tage
Phase 3


17
Marketing-Automatisierung — Email/WhatsApp-Vorlagen (VI/DE/EN), SEO für "vietnamesischer Fischgroßhandel".
Mittel
5 Tage
Phase 3


18
Admin-CMS — Inhaltsverwaltung, Terminplanung, ToDo-Automatisierung für Finanzen/Logistik.
Mittel
5 Tage
Phase 3



🌍 Phase 4: Skalierung & Compliance
Skalierung der Abläufe und vollständige Einhaltung von EU-Recht.



Schritt
Beschreibung
Priorität
Zeit
Phase



19
Multi-Warehouse-Sync (Berlin, Heidelberg, München), GPS-basierte Routenoptimierung.
Mittel
7 Tage
Phase 4


20
Steuerautomatisierung — UStVA-Erinnerungen, Lexware/Excel-Vorlagen, Incoterms-Integration.
Mittel
5 Tage
Phase 4


21
Nachhaltigkeits-Labels & Lieferanten-Matching (inspiriert von YORSO/Torg).
Niedrig
4 Tage
Phase 4


22
Produktionsreife — Hochverfügbare DB, Disaster-Recovery, Go-Live-Checkliste.
Hoch
5 Tage
Phase 4


23
Nutzertests mit vietnamesischen Kunden für VI-Lokalisierung & UX-Feedback.
Mittel
3 Tage
Phase 4



📝 Hinweise

Fortschritt verfolgen über GitHub Issues, die mit dieser Datei verknüpft sind.
Führe ./scripts/mark-step-done.sh <NUMMER> nach Abschluss eines Schritts aus, um todo.md zu aktualisieren und Änderungen in todo.log zu protokollieren.
Geschätzte Zeiten basieren auf einem kleinen Team (2-3 Entwickler). Passe sie an deine Ressourcen an.
Compliance: Konsultiere einen Anwalt/Steuerberater für DSGVO und Steuer-Compliance vor Abschluss von Phase 2.
Feedback: Teste mit vietnamesischen Nutzern, um sicherzustellen, dass die VI-Lokalisierung ihren Anforderungen entspricht.
