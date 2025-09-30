# 🌊 TopTuna — Aufgabenliste (gestylt)

> **B2B‑Portal für Fisch‑Großhandel** — Fokus: vietnamesische Restaurants

**Fortschritt:** `0 / 25` abgeschlossen
*(Wird automatisch aktualisiert, wenn du `./scripts/mark-step-done.sh <NUMMER>` ausführst.)*

---

## Schnellzugriff

* 📁 Repository: `./`
* 🛠 Scripts: `./scripts/mark-step-done.sh <NUMMER>`, `./scripts/update-todo.sh` (aktualisiert Fortschritt & `todo.log`)
* ✅ Status: Schritte als erledigt markieren mit dem oben genannten Script

---

## Inhaltsverzeichnis

1. Phase 0 — Setup (Basis)
2. Phase 1 — MVP Commerce & Betrieb
3. Phase 2 — Stabilisierung & Sicherheit
4. Phase 3 — Wachstum & KI
5. Phase 4 — Skalierung & Compliance
6. Hinweise & Empfehlungen

---

### Hinweise zur Nutzung

* Führe lokal aus: `./scripts/mark-step-done.sh 5` → markiert Schritt 5 als erledigt und schreibt in `todo.log`.
* Passe geschätzte Zeiten an dein Team an (Annahmen: 2–3 Entwickler).
* Verknüpfe relevante GitHub Issues mit den Schritten, damit CI/PRs transparent sind.

---

## Phase 0 — Setup (Basis) 🚀

> Aufbau der grundlegenden Infrastruktur und Developer‑Experience

|  # | Aufgabe                                                                                                | Priorität | Schätzung | Status |
| -: | ------------------------------------------------------------------------------------------------------ | --------: | --------: | :----- |
|  1 | Repository initialisieren, `render.yaml` & CI (GitHub Actions) — Basis‑Build‑Pipeline mit Unit‑Tests   |   🔥 Hoch |    2 Tage | ☐      |
|  2 | Docker Compose (Postgres 15/16) + Flyway V1 Schema (Produkte, Kunden, Bestellungen, Rollen, Bild‑URLs) |   🔥 Hoch |    3 Tage | ☐      |
|  3 | Gateway (Spring Cloud) + Authentifizierung (JWT) + Rollen (ADMIN, CUSTOMER)                            |   🔥 Hoch |    4 Tage | ☐      |
|  4 | Mehrsprachigkeit einrichten (DE / VI / EN, ngx‑translate) — Priorität: Vietnamesisch                   | ⚙️ Mittel |    3 Tage | ☐      |

---

## Phase 1 — MVP Commerce & Betrieb 🛒

> Kernfunktionen für Bestellungen, Lager und den laufenden Betrieb

|  # | Aufgabe                                                                                       | Priorität | Schätzung | Status |
| -: | --------------------------------------------------------------------------------------------- | --------: | --------: | :----- |
|  5 | Frontend PWA (Angular) — Produktliste, Produktseite, Warenkorb (responsive Mobile/Tablet)     |   🔥 Hoch |    7 Tage | ☐      |
|  6 | Order‑Service — Checkout, Bestellungsspeicherung, Kundenverlauf mit Filtern                   |   🔥 Hoch |    6 Tage | ☐      |
|  7 | Logistics‑Service — Liefertouren, Fahrer‑App mit Liefermarkierung, HACCP‑Prüfungen            |   🔥 Hoch |    5 Tage | ☐      |
|  8 | Rechnungserstellung + Buchungszeilen‑Speicherung, DATEV‑CSV‑Export (Windows‑1252, Audit‑Log)  |   🔥 Hoch |    5 Tage | ☐      |
|  9 | Admin‑Dashboard‑Grundgerüst — KPIs (Umsatz, Lager), Lagerübersicht, WebSocket‑Echtzeit        |   🔥 Hoch |    6 Tage | ☐      |
| 10 | Kunden‑Dashboard — Bestellverlauf, herunterladbare Berichte (Excel / PDF)                     | ⚙️ Mittel |    4 Tage | ☐      |
| 24 | Manueller Import von Produkten und Bildern von toptuna.de — CSV‑Upload für Katalog            |   🔥 Hoch |    3 Tage | ☐      |
| 25 | Automatische Synchronisation mit toptuna.de — Scheduled Job (Spring Boot, Jsoup), DSGVO‑Audit | ⚙️ Mittel |    5 Tage | ☐      |

> **Tipp:** Schritt 24 (manueller Import) als PoC vor Schritt 25 (Automatisierung) durchführen — so minimierst du Risiko bei Bild‑/Urheberfragen.

---

## Phase 2 — Stabilisierung & Sicherheit 🔒

> Absicherung, Datenschutz und Qualitätsmaßnahmen

|  # | Aufgabe                                                                                              | Priorität | Schätzung | Status |
| -: | ---------------------------------------------------------------------------------------------------- | --------: | --------: | :----- |
| 11 | Sicherheitsmaßnahmen — HTTPS / HSTS, CORS, JWT‑Refresh, Secrets‑Rotation (Render Secrets)            |   🔥 Hoch |    4 Tage | ☐      |
| 12 | DSGVO‑Compliance — Datenminimierung, Löschkonzepte, API für Datenzugriff & Export, Cookie‑Zustimmung |   🔥 Hoch |    5 Tage | ☐      |
| 13 | Tests — Unit‑ & Integrationstests mit Testcontainers, WCAG 2.1 (Kontrast / Tastaturnavigation)       | ⚙️ Mittel |    5 Tage | ☐      |
| 14 | Observability — Prometheus / Grafana, tägliche DB‑Backups, zentrale Logs                             | ⚙️ Mittel |    4 Tage | ☐      |

---

## Phase 3 — Wachstum & KI 📈

> Umsatzsteigerung mit KI‑gestützten Marketing‑ und Personalisierungsfunktionen

|  # | Aufgabe                                                                                                      | Priorität | Schätzung | Status |
| -: | ------------------------------------------------------------------------------------------------------------ | --------: | --------: | :----- |
| 15 | KI‑Marketing — Generator für Produktbeschreibungen (Backend‑Proxy, z. B. für LLM/Model Hosting), A/B‑Testing |   🔥 Hoch |    7 Tage | ☐      |
| 16 | Personalisierte Empfehlungen & Smart‑Reorder basierend auf Bestellverlauf                                    |   🔥 Hoch |    6 Tage | ☐      |
| 17 | Marketing‑Automatisierung — Email / WhatsApp Vorlagen (VI/DE/EN), SEO: „vietnamesischer Fischgroßhandel“     | ⚙️ Mittel |    5 Tage | ☐      |
| 18 | Admin‑CMS — Inhaltsverwaltung, Terminplanung, ToDo‑Automatisierung für Finanzen/Logistik                     | ⚙️ Mittel |    5 Tage | ☐      |

---

## Phase 4 — Skalierung & Compliance 🌍

> Multi‑Warehouse, Steuerintegration, Produktionsreife

|  # | Aufgabe                                                                         |  Priorität | Schätzung | Status |
| -: | ------------------------------------------------------------------------------- | ---------: | --------: | :----- |
| 19 | Multi‑Warehouse‑Sync (Berlin, Heidelberg, München), GPS‑Routenoptimierung       |  ⚙️ Mittel |    7 Tage | ☐      |
| 20 | Steuerautomatisierung — UStVA‑Erinnerungen, Lexware / Excel‑Vorlagen, Incoterms |  ⚙️ Mittel |    5 Tage | ☐      |
| 21 | Nachhaltigkeits‑Labels & Lieferanten‑Matching (inspiriert von YORSO/Torg)       | 🔽 Niedrig |    4 Tage | ☐      |
| 22 | Produktionsreife — Hochverfügbare DB, Disaster‑Recovery, Go‑Live‑Checkliste     |    🔥 Hoch |    5 Tage | ☐      |
| 23 | Nutzertests mit vietnamesischen Kunden — VI‑Lokalisierung & UX‑Feedback         |  ⚙️ Mittel |    3 Tage | ☐      |

---

## Compliance‑ & Rechts‑Hinweis

* Vor automatischem Import von Inhalten/Bildern von `toptuna.de` rechtliche Prüfung: Urheberrecht & Nutzungsbedingungen beachten. Konsultiere Anwalt/Steuerberater vor Phase 2‑Abschluss.
* DSGVO: Achte auf Rechtsgrundlage und dokumentiere Audit‑Logs bei automatischen Imports und Kunden‑Datenexporten.

---

## Empfehlungen zur Priorisierung (konkret)

1. **Sofort:** Schritte 1–3 (Repo, Docker + DB, Auth/Gateway) — bilden die Entwicklerplattform.
2. **Parallel:** Schritt 5 (Frontend PWA) + Schritt 6 (Order‑Service) — ermöglicht frühe Demo & Usability‑Tests.
3. **Vor Produktionsrelease:** Schritt 11 (Security), 12 (DSGVO) und 14 (Observability).

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

*Erstellt am: 30. Sep 2025 — gepflegt für TopTuna MVP & Go‑Live‑Planung.*
