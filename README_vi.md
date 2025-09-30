# 🌊 TopTuna — Ý tưởng, Kiến trúc & Lộ trình

> **Tổng quan**
> TopTuna là cổng B2B cho bán sỉ hải sản, tập trung vào nhà hàng Việt Nam. Mục tiêu: quản lý, bán hàng và điều phối vận hành (danh mục, đơn hàng, logistics, kế toán/DATEV) — tối ưu cho Web / Tablet / Di động và ưu tiên giao diện tiếng Việt cho người dùng bản xứ.

---

## 🎯 1. Mục tiêu chính (Vision)

* Bảng điều khiển quản trị mạnh mẽ: số liệu thời gian thực về doanh thu, tồn kho, giao hàng, nhân sự.
* Cửa hàng B2B thân thiện: PWA, tối ưu di động, hỗ trợ DE / VI / EN (ưu tiên VI).
* Công cụ AI hỗ trợ marketing & sản phẩm: mô tả tự động, ưu đãi cá nhân hóa, dự báo.
* Tích hợp kế toán mượt: DATEV / Lexware / Excel, nhắc nhở tự động.
* Tuân thủ GDPR / quy định EU, thêm tính năng bền vững (ví dụ: tracking CO₂).

---

## 🚀 2. Tính năng chính (MVP — Ưu tiên)

1. **Xác thực & Phân quyền** — Vai trò: `ADMIN`, `MARKETING`, `DISPO`, `DRIVER`, `ACCOUNTING`, `CUSTOMER`.
2. **Danh mục sản phẩm** — Giá bậc thang, biến thể, media lưu S3/MinIO, mô tả AI.
3. **Giỏ hàng & Checkout** — Luồng đặt hàng, quản lý trạng thái, hủy/hoàn.
4. **Logistics cơ bản** — Lịch giao, tour, app tài xế với GPS + HACCP checks.
5. **Kế toán & Hóa đơn** — PDF hóa đơn, dòng ghi sổ cố định, EXPORT DATEV + audit-log.
6. **Admin Dashboard** — KPI: doanh thu, tồn kho, độ đúng giờ giao hàng, task realtime (WebSockets).
7. **AI (cơ bản)** — Generator mô tả, Smart-Reorder, templates marketing, A/B testing.

---

## 🏗️ 3. Kiến trúc tóm tắt (High-level)

```
[ PWA Frontend (Angular) ]
           ↕ HTTPS
[ API Gateway (Spring Cloud Gateway) ]
           ↕ REST / gRPC
[ Microservices (Spring Boot) theo Bounded Context ]
  - auth-service (JWT)
  - catalog-service
  - order-service
  - logistics-service (GPS)
  - crm-service
  - export-service (DATEV / Lexware / XLSX)
  - marketing-service (AI-Proxy / ML)
           ↕
[ Postgres DB(s) ] (prod: managed hoặc 1 DB/service)
           ↕
[ Object Storage ] (Hình ảnh, Chứng từ)
           ↕
[ Monitoring / Metrics / Notifications ]
```

**Ghi chú:** Sử dụng Flyway cho migration, Testcontainers cho integration tests.

---

## ⚙️ 4. Triển khai & CI

* **CI:** GitHub Actions — `build → test → deploy`.
* **Prod:** Render.com (dùng `render.yaml`), lưu secrets (e.g. `JWT_SECRET`, `DATABASE_URL`) tại Render Secrets.
* **Frontend:** Inject `API_BASE` (Gateway URL) lúc build; PWA + Service Worker.
* **DB:** Postgres 15/16 (khóa major version), backup tự động.
* **Migrations:** Flyway, versioned migrations.

---

## ⚖️ 5. Yêu cầu pháp lý EU (Tóm tắt)

* **GDPR:** minimization, data deletion flows, consent cho marketing, cơ chế export/access.
* **ePrivacy / Cookies:** banner & consent management.
* **Kế toán/Thuế:** tuân thủ deadlines (ví dụ UStVA), audit-log cho exports.

> **Lưu ý:** Tài liệu này là hướng dẫn kỹ thuật — hãy hỏi luật sư / tư vấn thuế để có khuyến nghị pháp lý chính thức.

---

## 🔐 6. Bảo mật & Vận hành (Essentials)

* **Secrets:** Không commit vào VCS. Dùng Render/K8s/GitHub Secrets.
* **HTTPS:** Bật HSTS trên Gateway, CORS chặt chẽ.
* **JWT:** Tokens ngắn hạn + refresh token, RBAC cho endpoints.
* **Backups:** Daily DB backups + DR plan.
* **Observability:** Spring Actuator + Prometheus + Grafana + centralized logs (ELK / Loki).

---

## ♿ 7. UX & Trợ năng

* **Mobile-first:** tối ưu cho tài xế & chủ nhà hàng.
* **Đa ngôn ngữ:** DE / VI / EN — workflow dịch, ưu tiên VI.
* **WCAG 2.1 (cơ bản):** contrast, keyboard nav, alt-text, form validation.

---

## 🧾 8. Tích hợp DATEV / Lexware / Excel

* **DATEV:** Xuất CSV (Windows-1252, `;`), bảng audit `datev_export`.
* **Lexware:** CSV templates cho master data & bookings (có thể qua DATEV intermediary).
* **Excel:** XLSX reports (Apache POI) cho báo cáo thủ công.

---

## 🗺️ 9. Lộ trình (Phases)

> Chi tiết task → `todo.md`

**Phase 0 — Setup (Cơ bản)**

* Repo, CI, `render.yaml`, `docker-compose` local (Postgres), Flyway V1 (schema).
* Basis frontend, gateway, auth.

**Phase 1 — MVP Commerce & Ops**

* Catalog, Orders, Checkout, Invoice generation.
* Logistics basic (delivery markers, driver flows).
* DATEV basic export, admin dashboard scaffold.

**Phase 2 — Stabilize & Security**

* RBAC, TLS, secret rotation, unit/integration tests, staging deploy.
* Observability, backups, hardened DB migrations.

**Phase 3 — Growth & AI**

* AI: product descriptions, marketing templates, recommendations.
* Admin CMS, scheduling, A/B tests, E-Mail / WhatsApp automation.

**Phase 4 — Scale & Compliance**

* Multi-warehouse, advanced routing, HA DB, stricter GDPR processes.
* Tax automation (deadlines reminders), Lexware deeper integration.

---

## 🛠️ 10. Phát triển / Quy tắc đóng góp

* **Branching:** `main` = prod, `develop` = pre-prod, feature `feat/*`.
* **Commit format:** `TYPE(scope): short summary + refs todo#<step>` khi cần.
* **Tests:** Unit + Integration (Testcontainers) trong CI pipeline.
* **Code Style:** Clean code, DTOs + Mapper, versioned API contracts.

---

## ✅ 11. Theo dõi công việc (todo.md)

Sử dụng `todo.md` làm single source of truth. Sau khi hoàn thành step, chạy:

```bash
./scripts/mark-step-done.sh <SỐ_BƯỚC>
```

Script sẽ đánh dấu bước là xong và cập nhật tiến độ.

---

## 📞 12. Liên hệ & Bước tiếp theo

Nếu cần giúp (di cư dữ liệu, controller mẫu, UI admin, AI-Proxy patch), hãy cho biết **giai đoạn** hoặc **ticket** bạn muốn ưu tiên — mình có thể tạo ngay: `README.md` đẹp, `todo.md` start list cho Phase 0, và `render.yaml` mẫu cho Render.com.

