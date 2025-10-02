# 🌊 TopTuna — Aufgabenliste (gestylt)

> **B2B‑Portal für Fisch‑Großhandel** — Fokus: vietnamesische Restaurants

**Fortschritt:** `12 / 25` abgeschlossen (48%)
*(Aktualisiert am: 01. Okt 2025)*

---

## Schnellzugriff

* 📁 Repository: `./`
* 🛠 Scripts: `./scripts/mark-step-done.sh <NUMMER>`, `./scripts/update-todo.sh` (aktualisiert Fortschritt & `todo.log`)
* ✅ Status: Schritte als erledigt markieren mit dem oben genannten Script

---

## Inhaltsverzeichnis

1. Phase 0 — Setup (Basis) ✅ **ABGESCHLOSSEN**
2. Phase 1 — MVP Commerce & Betrieb (Teilweise)
3. Phase 2 — Stabilisierung & Sicherheit
4. Phase 3 — Wachstum & KI (Teilweise)
5. Phase 4 — Skalierung & Compliance
6. Hinweise & Empfehlungen

---

### Hinweise zur Nutzung

* Führe lokal aus: `./scripts/mark-step-done.sh 5` → markiert Schritt 5 als erledigt und schreibt in `todo.log`.
* Passe geschätzte Zeiten an dein Team an (Annahmen: 2–3 Entwickler).
* Verknüpfe relevante GitHub Issues mit den Schritten, damit CI/PRs transparent sind.

---

## Phase 0 — Setup (Basis) 🚀 ✅ **ABGESCHLOSSEN**

> Aufbau der grundlegenden Infrastruktur und Developer‑Experience

|  # | Aufgabe                                                                                                | Priorität | Schätzung | Status |
| -: | ------------------------------------------------------------------------------------------------------ | --------: | --------: | :----- |
|  1 | Repository initialisieren, `render.yaml` & CI (GitHub Actions) — Basis‑Build‑Pipeline mit Unit‑Tests   |   🔥 Hoch |    2 Tage | ✅ Erledigt |
|  2 | Docker Compose (Postgres 15/16) + Flyway V1 Schema (Produkte, Kunden, Bestellungen, Rollen, Bild‑URLs) |   🔥 Hoch |    3 Tage | ✅ Erledigt |
|  3 | Gateway (Spring Cloud) + Authentifizierung (JWT) + Rollen (ADMIN, CUSTOMER)                            |   🔥 Hoch |    4 Tage | ✅ Erledigt |
|  4 | Mehrsprachigkeit einrichten (DE / VI / EN, ngx‑translate) — Priorität: Vietnamesisch                   | ⚙️ Mittel |    3 Tage | ✅ Erledigt |

---

## Phase 1 — MVP Commerce & Betrieb 🛒 (7/8 abgeschlossen)

> Kernfunktionen für Bestellungen, Lager und den laufenden Betrieb

|  # | Aufgabe                                                                                       | Priorität | Schätzung | Status |
| -: | --------------------------------------------------------------------------------------------- | --------: | --------: | :----- |
|  5 | Frontend PWA (Angular) — Produktliste, Produktseite, Warenkorb (responsive Mobile/Tablet)     |   🔥 Hoch |    7 Tage | ✅ Erledigt |
|  6 | Order‑Service — Checkout, Bestellungsspeicherung, Kundenverlauf mit Filtern                   |   🔥 Hoch |    6 Tage | ✅ Erledigt |
|  7 | Logistics‑Service — Liefertouren, Fahrer‑App mit Liefermarkierung, HACCP‑Prüfungen            |   🔥 Hoch |    5 Tage | ✅ Erledigt |
|  8 | Rechnungserstellung + Buchungszeilen‑Speicherung, DATEV‑CSV‑Export (Windows‑1252, Audit‑Log)  |   🔥 Hoch |    5 Tage | ✅ Erledigt |
|  9 | Admin‑Dashboard‑Grundgerüst — KPIs (Umsatz, Lager), Lagerübersicht, WebSocket‑Echtzeit        |   🔥 Hoch |    6 Tage | ✅ Erledigt |
| 10 | Kunden‑Dashboard — Bestellverlauf, herunterladbare Berichte (Excel / PDF)                     | ⚙️ Mittel |    4 Tage | ☐ Offen |
| 24 | Manueller Import von Produkten und Bildern von toptuna.de — CSV‑Upload für Katalog            |   🔥 Hoch |    3 Tage | ✅ Erledigt |
| 25 | Automatische Synchronisation mit toptuna.de — Scheduled Job (Spring Boot, Jsoup), DSGVO‑Audit | ⚙️ Mittel |    5 Tage | ✅ Erledigt |

> **Status:** Import-System umbenannt zu "Import von TopTuna.de" für bessere Semantik. KI-gestützte Datenkorrektur implementiert.

---

## Phase 2 — Stabilisierung & Sicherheit 🔒 (1/4 abgeschlossen)

> Absicherung, Datenschutz und Qualitätsmaßnahmen

|  # | Aufgabe                                                                                              | Priorität | Schätzung | Status |
| -: | ---------------------------------------------------------------------------------------------------- | --------: | --------: | :----- |
| 11 | Sicherheitsmaßnahmen — HTTPS / HSTS, CORS, JWT‑Refresh, Secrets‑Rotation (Render Secrets)            |   🔥 Hoch |    4 Tage | ✅ Erledigt |
| 12 | DSGVO‑Compliance — Datenminimierung, Löschkonzepte, API für Datenzugriff & Export, Cookie‑Zustimmung |   🔥 Hoch |    5 Tage | ☐ Offen |
| 13 | Tests — Unit‑ & Integrationstests mit Testcontainers, WCAG 2.1 (Kontrast / Tastaturnavigation)       | ⚙️ Mittel |    5 Tage | ☐ Offen |
| 14 | Observability — Prometheus / Grafana, tägliche DB‑Backups, zentrale Logs                             | ⚙️ Mittel |    4 Tage | ☐ Offen |

---

## Phase 3 — Wachstum & KI 📈 (1/4 abgeschlossen)

> Umsatzsteigerung mit KI‑gestützten Marketing‑ und Personalisierungsfunktionen

|  # | Aufgabe                                                                                                      | Priorität | Schätzung | Status |
| -: | ------------------------------------------------------------------------------------------------------------ | --------: | --------: | :----- |
| 15 | KI‑Marketing — Generator für Produktbeschreibungen (Backend‑Proxy, z. B. für LLM/Model Hosting), A/B‑Testing |   🔥 Hoch |    7 Tage | ✅ Erledigt |
| 16 | Personalisierte Empfehlungen & Smart‑Reorder basierend auf Bestellverlauf                                    |   🔥 Hoch |    6 Tage | ☐ Offen |
| 17 | Marketing‑Automatisierung — Email / WhatsApp Vorlagen (VI/DE/EN), SEO: „vietnamesischer Fischgroßhandel"     | ⚙️ Mittel |    5 Tage | ☐ Offen |
| 18 | Admin‑CMS — Inhaltsverwaltung, Terminplanung, ToDo‑Automatisierung für Finanzen/Logistik                     | ⚙️ Mittel |    5 Tage | ☐ Offen |

> **Status:** KI-Provider-Abstraction implementiert mit OpenAI (ChatGPT) als Standard. Unterstützt Claude und Fallback-Provider.

---

## Phase 4 — Skalierung & Compliance 🌍 (0/5 abgeschlossen)

> Multi‑Warehouse, Steuerintegration, Produktionsreife

|  # | Aufgabe                                                                         |  Priorität | Schätzung | Status |
| -: | ------------------------------------------------------------------------------- | ---------: | --------: | :----- |
| 19 | Multi‑Warehouse‑Sync (Berlin, Heidelberg, München), GPS‑Routenoptimierung       |  ⚙️ Mittel |    7 Tage | ☐ Offen |
| 20 | Steuerautomatisierung — UStVA‑Erinnerungen, Lexware / Excel‑Vorlagen, Incoterms |  ⚙️ Mittel |    5 Tage | ☐ Offen |
| 21 | Nachhaltigkeits‑Labels & Lieferanten‑Matching (inspiriert von YORSO/Torg)       | 🔽 Niedrig |    4 Tage | ☐ Offen |
| 22 | Produktionsreife — Hochverfügbare DB, Disaster‑Recovery, Go‑Live‑Checkliste     |    🔥 Hoch |    5 Tage | ☐ Offen |
| 23 | Nutzertests mit vietnamesischen Kunden — VI‑Lokalisierung & UX‑Feedback         |  ⚙️ Mittel |    3 Tage | ☐ Offen |

---

## 🎯 **Aktuelle Prioritäten (Nächste Schritte)**

### **Sofort (Diese Woche)**
1. **Schritt 10** - Kunden-Dashboard für Bestellverlauf
2. **Schritt 12** - DSGVO-Compliance implementieren
3. **Schritt 13** - Unit & Integration Tests

### **Kurzfristig (Nächste 2 Wochen)**
4. **Schritt 14** - Monitoring & Observability
5. **Schritt 16** - Personalisierte Empfehlungen
6. **Schritt 22** - Produktionsreife vorbereiten

---

## 🚀 **Erreichte Meilensteine**

✅ **Microservices-Architektur** - Alle 7 Services implementiert
✅ **KI-Integration** - ChatGPT/Claude Provider mit Fallback
✅ **Import-System** - Automatischer Import von toptuna.de
✅ **Frontend PWA** - Responsive Angular-Anwendung
✅ **Mehrsprachigkeit** - DE/VI/EN Unterstützung
✅ **Security** - JWT Authentication & RBAC

---

## Compliance‑ & Rechts‑Hinweis

* Vor automatischem Import von Inhalten/Bildern von `toptuna.de` rechtliche Prüfung: Urheberrecht & Nutzungsbedingungen beachten. Konsultiere Anwalt/Steuerberater vor Phase 2‑Abschluss.
* DSGVO: Achte auf Rechtsgrundlage und dokumentiere Audit‑Logs bei automatischen Imports und Kunden‑Datenexporten.

---

## Empfehlungen zur Priorisierung (konkret)

1. **Sofort:** ✅ Schritte 1–3 (Repo, Docker + DB, Auth/Gateway) — bilden die Entwicklerplattform.
2. **Parallel:** ✅ Schritt 5 (Frontend PWA) + Schritt 6 (Order‑Service) — ermöglicht frühe Demo & Usability‑Tests.
3. **Vor Produktionsrelease:** Schritt 11 ✅ (Security), 12 (DSGVO) und 14 (Observability).

---

## DevOps / Deployment Tipps

* Render: `render.yaml` sauber prüfen (richtiges `runtime` für Java).
* CI: GitHub Actions mit Matrix builds (Java 17/21), Docker Buildx, Tests, und Deploy → Render.
* Secrets: Nutze Render Secrets oder Vault für produktive Secrets; rotiere regelmäßig.

---

## Wie weiter?

* Möchtest du, dass ich aus dieser Liste einzelne GitHub Issues + Labels generiere (z. B. `phase:0`, `priority:high`, `estimate:2d`)?
* Oder soll ich eine druckbare Version (`todo_print.md` / PDF) erzeugen?

---

*Erstellt am: 30. Sep 2025 — Aktualisiert: 01. Okt 2025 — gepflegt für TopTuna MVP & Go‑Live‑Planung.*
