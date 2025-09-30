🌊 TopTuna — Ý tưởng, Kiến trúc & Lộ trình
1. Tổng quan
TopTuna là một cổng B2B dành cho bán sỉ hải sản, tập trung vào các nhà hàng Việt Nam. Mục tiêu: Quản lý hiệu quả, bán hàng và kiểm soát vận hành (danh mục sản phẩm, đơn hàng, logistics, kế toán bao gồm DATEV) — tối ưu hóa cho Web, Tablet và Di động. Đặc biệt hỗ trợ người dùng Việt Nam với ngôn ngữ mẹ đẻ (Tiếng Việt).
2. Mục tiêu chính

Bảng điều khiển quản trị mạnh mẽ hiển thị dữ liệu thời gian thực về doanh thu, tồn kho, giao hàng và nhân sự.
Cửa hàng B2B thân thiện (tối ưu di động, đa ngôn ngữ DE/VI/EN, ưu tiên Tiếng Việt).
Công cụ AI hỗ trợ tiếp thị và sản phẩm (văn bản, ưu đãi cá nhân hóa, dự báo).
Tích hợp kế toán mượt mà (DATEV, Lexware, Excel) với nhắc nhở tự động.
Tuân thủ GDPR và các yêu cầu pháp lý EU, bao gồm tính năng bền vững.

3. Tính năng chính (MVP → Ưu tiên)

Xác thực & Phân quyền (ADMIN: Toàn quyền, MARKETING, DISPO, DRIVER, ACCOUNTING, CUSTOMER: Lịch sử đơn hàng).  
Danh mục sản phẩm với giá bậc thang, giao diện PWA với mô tả AI.  
Giỏ hàng, quy trình đặt hàng, quản lý đơn hàng.  
Logistics: Lịch trình giao hàng, ứng dụng tài xế với theo dõi GPS, kiểm tra HACCP.  
Hóa đơn, lưu trữ dòng ghi sổ, xuất dữ liệu DATEV với nhật ký kiểm toán.  
Bảng điều khiển Admin: Doanh thu, tồn kho, độ chính xác giao hàng, công việc cần làm (cập nhật thời gian thực qua WebSockets).  
AI: Trình tạo mô tả sản phẩm, đặt hàng thông minh, mẫu tiếp thị, kiểm tra A/B.

4. Kiến trúc tóm tắt
[Frontend PWA (Angular)]
  ↕ HTTPS
[API Gateway (Spring Cloud Gateway)]
  ↕ REST/gRPC
[Microservices (Spring Boot) theo ngữ cảnh giới hạn]
  - auth-service (JWT)
  - catalog-service
  - order-service
  - logistics-service (tích hợp GPS)
  - crm-service
  - export-service (DATEV / Lexware / XLSX)
  - marketing-service (KI-Proxy với ML)
  ↕
[Postgres DB(s)] (sản xuất: một DB cho mỗi dịch vụ hoặc instances được quản lý)
  ↕
[Object Storage] (Hình ảnh sản phẩm, chứng từ)
  ↕
[Giám sát / Chỉ số / Thông báo]

5. Triển khai & Tích hợp liên tục (CI)

CI: GitHub Actions (xây dựng → kiểm tra → triển khai).  
Sản xuất: Render.com (render.yaml) với thông tin bảo mật (JWT_SECRET, DATABASE_URL).  
Frontend: Tiêm giá trị API_BASE (URL Gateway) tại thời điểm xây dựng.  
Cơ sở dữ liệu: Postgres 15/16 (giữ cố định phiên bản chính), Flyway cho di cư dữ liệu.

6. Yêu cầu pháp lý EU (Tóm tắt)

GDPR: Giảm thiểu dữ liệu, quy trình xóa dữ liệu, đồng ý cho tiếp thị, cơ chế truy cập/xuất dữ liệu.  
ePrivacy / Cookies: Banner cookie và quản lý đồng ý cho theo dõi & bản tin.  
Kế toán/Thuế: Tuân thủ thời hạn (UStVA, v.v.), ghi nhật ký kiểm toán xuất dữ liệu, nhắc nhở tự động.  
Lưu ý: README này chỉ cung cấp hướng dẫn. Để xử lý pháp lý chính thức, hãy tham khảo ý kiến luật sư chuyên môn hoặc cố vấn thuế.



7. Bảo mật & Vận hành (Thiết yếu)

Thông tin bảo mật: Không lưu trong VCS. Sử dụng Render Secrets, K8s Secrets hoặc GitHub Secrets.  
HTTPS: Áp dụng khắp nơi, HSTS tại Gateway, cấu hình CORS chặt chẽ.  
JWT: Token ngắn hạn + Làm mới, bảo mật endpoint dựa trên vai trò.  
Sao lưu: Sao lưu cơ sở dữ liệu hàng ngày, kế hoạch phục hồi thảm họa.  
Quan sát: Actuator + Prometheus + Grafana + Nhật ký trung tâm.

8. Trải nghiệm người dùng & Trợ năng

Thiết kế ưu tiên di động: Tối ưu cho tài xế và chủ nhà hàng (Điện thoại/Tablet).  
Đa ngôn ngữ: DE/VI/EN với quy trình dịch thuật, ưu tiên Tiếng Việt.  
WCAG 2.1: Tuân thủ cơ bản (độ tương phản, điều hướng bàn phím, văn bản thay thế).

9. Tích hợp DATEV / Lexware / Excel

DATEV: Xuất CSV (Windows-1252, dấu chấm phẩy), bảng kiểm toán datev_export.  
Lexware: Mẫu CSV cho dữ liệu gốc và ghi sổ (nếu cần, thông qua DATEV).  
Excel: XLSX cho báo cáo thủ công (Apache POI).

10. Lộ trình (Giai đoạn)
Chi tiết lộ trình phát triển được liệt kê trong todo.md.
Giai đoạn 0 — Thiết lập (Cơ bản)

Kho lưu trữ, CI, render.yaml, Docker Compose cục bộ (Postgres), Flyway V1 (Schema).  
Frontend cơ bản, Gateway, Xác thực.

Giai đoạn 1 — MVP Thương mại & Vận hành

Danh mục, Đơn hàng, Thanh toán, Tạo hóa đơn.  
Logistics cơ bản (giao hàng, đánh dấu giao hàng bởi tài xế).  
Xuất DATEV cơ bản, khung bảng điều khiển quản trị.

Giai đoạn 2 — Ổn định & Bảo mật

RBAC, TLS, xoay vòng thông tin bảo mật, kiểm tra đơn vị/tích hợp, triển khai môi trường staging.  
Quan sát, sao lưu, tăng cường di cư cơ sở dữ liệu.

Giai đoạn 3 — Tăng trưởng & AI

AI: Mô tả sản phẩm, mẫu tiếp thị, khuyến nghị.  
CMS quản trị, lập lịch, kiểm tra A/B, tự động hóa email/WhatsApp.

Giai đoạn 4 — Mở rộng & Tuân thủ

Hỗ trợ nhiều kho, định tuyến nâng cao, cơ sở dữ liệu sẵn sàng cao, quy trình GDPR chặt chẽ.  
Tự động hóa thuế (nhắc nhở thời hạn), tích hợp Lexware, quy trình cho kế toán.

11. Phát triển / Cách đóng góp

Phân nhánh: main = sản xuất, develop = tiền sản xuất, nhánh tính năng feat/*.  
Định dạng cam kết: TYPE(scope): tóm tắt ngắn + refs todo#<bước> nếu liên quan.  
Kiểm tra: Đơn vị + Tích hợp (Testcontainers) trong CI.

12. Theo dõi công việc (tự động qua todo.md)
Chúng tôi sử dụng todo.md làm nguồn sự thật duy nhất cho các bước phát triển. Sau mỗi bước hoàn thành, chạy cục bộ ./scripts/mark-step-done.sh <SỐ> để đánh dấu bước hoàn thành và cập nhật tiến độ.
13. Liên hệ & Hỗ trợ
Nếu có câu hỏi hoặc cần hỗ trợ (ví dụ: di cư dữ liệu, API mẫu, giao diện quản trị, KI-Proxy dưới dạng bản vá), hãy liên hệ với tôi. Vui lòng cho biết giai đoạn hoặc ticket nào bạn muốn ưu tiên!