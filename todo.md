TopTuna Todo List
This file tracks development steps for TopTuna. Run ./scripts/mark-step-done.sh <NUMMER> locally to mark a step as completed and update progress.
Phase 0: Setup (Basis)

 Step 1: Initialize repo, render.yaml & CI (GitHub Actions) — Basic build pipeline with unit tests.Priority: High, Time: 2 days, Phase 0
 Step 2: Docker Compose (Postgres 15/16) + Flyway V1 Schema (products, customers, orders, roles).Priority: High, Time: 3 days, Phase 0
 Step 3: Gateway (Spring Cloud) + Auth service (JWT) + roles (ADMIN, CUSTOMER).Priority: High, Time: 4 days, Phase 0
 Step 4: Multilingual setup (DE/VI/EN, ngx-translate) with VI-priority for Vietnamese users.Priority: Medium, Time: 3 days, Phase 0

Phase 1: MVP Commerce & Ops

 Step 5: Frontend PWA (Angular) — Product listing, product page, cart (responsive for mobile/tablet).Priority: High, Time: 7 days, Phase 1
 Step 6: Order-Service — Checkout, order persistence, customer history with filters.Priority: High, Time: 6 days, Phase 1
 Step 7: Logistics-Service — Delivery tours, driver app with mark-delivered, HACCP-checks.Priority: High, Time: 5 days, Phase 1
 Step 8: Invoice generation + booking_entry persistence, DATEV CSV export (Windows-1252, audit log).Priority: High, Time: 5 days, Phase 1
 Step 9: Admin Dashboard skeleton — KPIs (revenue, stock), warehouse overview, WebSocket live-updates.Priority: High, Time: 6 days, Phase 1
 Step 10: Customer Dashboard — Order history, downloadable reports (Excel/PDF).Priority: Medium, Time: 4 days, Phase 1

Phase 2: Stabilisierung & Security

 Step 11: Security hardening — HTTPS/HSTS, CORS, JWT refresh, secrets rotation (Render Secrets).Priority: High, Time: 4 days, Phase 2
 Step 12: DSGVO-Compliance — Data minimization, deletion concepts, user data export API, cookie consent.Priority: High, Time: 5 days, Phase 2
 Step 13: Tests — Unit & integration tests with Testcontainers, WCAG 2.1 compliance (contrast, keyboard nav).Priority: Medium, Time: 5 days, Phase 2
 Step 14: Observability — Prometheus/Grafana for metrics, daily DB backups, centralized logging.Priority: Medium, Time: 4 days, Phase 2

Phase 3: Growth & KI

 Step 15: KI-Marketing — Product description generator (backend proxy, e.g., PyTorch), A/B-testing.Priority: High, Time: 7 days, Phase 3
 Step 16: Personalized recommendations & Smart-Reorder based on order history.Priority: High, Time: 6 days, Phase 3
 Step 17: Marketing automation — Email/WhatsApp templates (VI/DE/EN), SEO for "Vietnamese fish wholesale".Priority: Medium, Time: 5 days, Phase 3
 Step 18: Admin CMS — Content management, scheduling, ToDo automation for finance/logistics.Priority: Medium, Time: 5 days, Phase 3

Phase 4: Scale & Compliance

 Step 19: Multi-warehouse sync (Berlin, Heidelberg, Munich), GPS-based route optimization.Priority: Medium, Time: 7 days, Phase 4
 Step 20: Tax automation — UStVA reminders, Lexware/Excel templates, Incoterms integration.Priority: Medium, Time: 5 days, Phase 4
 Step 21: Sustainability labels & supplier matching (inspired by YORSO/Torg).Priority: Low, Time: 4 days, Phase 4
 Step 22: Production readiness — High-availability DB, disaster recovery, go-live checklist.Priority: High, Time: 5 days, Phase 4
 Step 23: User testing with Vietnamese customers for VI-localization & UX feedback.Priority: Medium, Time: 3 days, Phase 4

Notes

Track progress via GitHub Issues linked to this file.
Run ./scripts/mark-step-done.sh <NUMMER> after completing each step.
Estimated times assume a small team (2-3 developers). Adjust based on resources.
Consult lawyer/tax advisor for DSGVO and tax compliance before Phase 2 completion.
