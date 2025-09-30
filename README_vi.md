# TopTuna — Ý tưởng, Kiến trúc & Lộ trình (Tiếng Việt)

## 1. Tổng quát
TopTuna là portal B2B cho bán sỉ hải sản, hướng tới nhà hàng Việt Nam. Mục tiêu: quản lý, bán hàng, vận hành (catalog, đơn hàng, logistics, kế toán/DATEV) — responsive cho Web/Tablet/Di động.

## 2. Mục tiêu chính
- Dashboard quản trị toàn diện (doanh thu, tồn kho, giao hàng, nhân sự).  
- Cửa hàng B2B thân thiện, đa ngôn ngữ (DE/VI/EN).  
- Ứng dụng AI cho nội dung sản phẩm và marketing.  
- Hỗ trợ xuất dữ liệu kế toán (DATEV, Lexware, Excel).  
- Tuân thủ GDPR / EU.

## 3. Kiến trúc tóm tắt
- Frontend: Angular PWA  
- API Gateway: Spring Cloud Gateway  
- Microservices: Spring Boot (auth, catalog, orders, logistics, crm, export, marketing)  
- DB: PostgreSQL (Flyway migrations)  
- Storage: S3/Render storage cho hình ảnh, chứng từ  
- Observability: Prometheus/Grafana

## 4. Tính năng chính (MVP)
1. Đăng nhập & phân quyền.  
2. Sản phẩm + giá thang.  
3. Giỏ hàng, Đặt hàng, Quản lý đơn.  
4. Logistics cơ bản, ứng dụng tài xế.  
5. Hóa đơn & xuất DATEV.  
6. Dashboard Admin, AI: mô tả sản phẩm.

## 5. Lộ trình ngắn hạn
- Setup môi trường dev (Docker Compose + Postgres), CI (GitHub Actions)  
- MVP commerce + logistics + datev export  
- Bảo mật & giám sát  
- Tính năng AI & marketing

## 6. Tuân thủ pháp lý (EU)
- GDPR: quyền truy cập, xóa dữ liệu, cookie consent.  
- Các báo cáo thuế / kỳ hạn cần theo quy định địa phương.

## 7. Tương tác & Hỗ trợ
- Nếu cần, tôi có thể tạo migration, API mẫu, admin UI và script tự động hóa — báo tôi phần bạn muốn triển khai trước.

