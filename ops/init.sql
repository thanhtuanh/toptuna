-- TopTuna Demo Data für vietnamesische Restaurantbesitzer
-- Sushi, Chinesisch, Thailändisch Restaurants in Berlin, Heidelberg, München

-- Kunden (Vietnamesische Restaurantbesitzer)
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(50) PRIMARY KEY,
    restaurant_name VARCHAR(100),
    owner_name VARCHAR(100),
    restaurant_type VARCHAR(50),
    location VARCHAR(50),
    language VARCHAR(10),
    avg_order_value DECIMAL(10,2),
    order_frequency INT,
    market_segment VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customers VALUES
('rest_001', 'Saigon Sushi Berlin', 'Nguyen Van Duc', 'Sushi', 'Berlin', 'vi', 450.00, 12, 'Premium'),
('rest_002', 'Golden Dragon', 'Tran Thi Mai', 'Chinesisch', 'Heidelberg', 'vi', 320.00, 8, 'Standard'),
('rest_003', 'Thai Lotus München', 'Le Van Minh', 'Thailändisch', 'München', 'vi', 280.00, 6, 'Standard'),
('rest_004', 'Hanoi Sushi House', 'Pham Thi Lan', 'Sushi', 'Berlin', 'vi', 520.00, 15, 'Premium'),
('rest_005', 'Mekong Palace', 'Vo Van Thanh', 'Chinesisch', 'München', 'vi', 380.00, 10, 'Premium'),
('rest_006', 'Bamboo Garden', 'Hoang Thi Nga', 'Thailändisch', 'Heidelberg', 'vi', 250.00, 5, 'Standard');

-- Bestellungen
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50),
    order_date DATE,
    total_amount DECIMAL(10,2),
    status VARCHAR(50),
    delivery_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

INSERT INTO orders VALUES
('ord_001', 'rest_001', '2024-09-20', 485.50, 'Geliefert', '2024-09-21'),
('ord_002', 'rest_002', '2024-09-22', 325.80, 'Geliefert', '2024-09-23'),
('ord_003', 'rest_003', '2024-09-24', 290.00, 'In Bearbeitung', '2024-09-26'),
('ord_004', 'rest_001', '2024-09-25', 520.00, 'Bestätigt', '2024-09-27'),
('ord_005', 'rest_004', '2024-09-25', 680.50, 'Bestätigt', '2024-09-27');

-- Bestellpositionen
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50),
    product_sku VARCHAR(50),
    quantity DECIMAL(8,2),
    unit_price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

INSERT INTO order_items VALUES
('item_001', 'ord_001', 'TT-SAL-FI-001', 15.0, 16.90),
('item_002', 'ord_001', 'TT-TUN-LO-003', 8.0, 24.90),
('item_003', 'ord_002', 'TT-SHR-BT-02630', 12.0, 12.90),
('item_004', 'ord_002', 'TT-COD-FI-001', 10.0, 19.90),
('item_005', 'ord_003', 'TT-SQD-TUB-250', 20.0, 8.90),
('item_006', 'ord_004', 'TT-SAL-FI-001', 20.0, 16.90),
('item_007', 'ord_004', 'TT-SCL-U10-500', 6.0, 28.90),
('item_008', 'ord_005', 'TT-TUN-LO-003', 12.0, 24.90),
('item_009', 'ord_005', 'TT-EEL-UNA-500', 15.0, 18.50);

-- Kundenpräferenzen
CREATE TABLE IF NOT EXISTS customer_preferences (
    customer_id VARCHAR(50),
    category VARCHAR(50),
    preference_score DECIMAL(3,2),
    PRIMARY KEY (customer_id, category),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

INSERT INTO customer_preferences VALUES
('rest_001', 'Lachs', 0.95),
('rest_001', 'Thunfisch', 0.88),
('rest_002', 'Garnelen', 0.92),
('rest_002', 'Kabeljau', 0.75),
('rest_003', 'Tintenfisch', 0.90),
('rest_004', 'Lachs', 0.98),
('rest_004', 'Jakobsmuscheln', 0.85),
('rest_005', 'Garnelen', 0.88),
('rest_006', 'Tintenfisch', 0.85);

-- Marketing Insights
CREATE TABLE IF NOT EXISTS market_insights (
    region VARCHAR(50),
    total_customers INT,
    vietnamese_customers INT,
    avg_order_value DECIMAL(10,2),
    growth_potential VARCHAR(50),
    top_categories VARCHAR(200)
);

INSERT INTO market_insights VALUES
('Berlin', 45, 42, 485.00, '+15%', 'Lachs,Thunfisch,Garnelen'),
('Heidelberg', 28, 25, 298.00, '+22%', 'Garnelen,Kabeljau,Tintenfisch'),
('München', 18, 16, 330.00, '+35%', 'Lachs,Jakobsmuscheln,Aal');

-- Produktempfehlungen
CREATE TABLE IF NOT EXISTS ai_recommendations (
    id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50),
    product_sku VARCHAR(50),
    reason VARCHAR(200),
    confidence DECIMAL(3,2),
    target_message_de VARCHAR(300),
    target_message_vi VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

INSERT INTO ai_recommendations VALUES
('rec_001', 'rest_001', 'TT-SAL-FI-001', 'Bestseller für Sushi-Restaurants', 0.95, 
 'Premium Lachs für Ihre Sushi-Qualität', 'Cá hồi cao cấp cho chất lượng Sushi của bạn', NOW()),
('rec_002', 'rest_003', 'TT-SQD-TUB-250', 'Perfekt für Thai-Gerichte', 0.88,
 'Frische Tintenfisch-Tuben für authentische Thai-Küche', 'Ống mực tươi cho món Thái chính hiệu', NOW()),
('rec_003', 'rest_005', 'TT-EEL-UNA-500', 'München Expansion - Premium Aal', 0.92,
 'Unagi Aal für gehobene chinesische Küche', 'Lươn Unagi cho ẩm thực Trung Hoa cao cấp', NOW());
