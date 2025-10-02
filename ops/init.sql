-- TopTuna Demo Data für vietnamesische Restaurantbesitzer
-- Sushi, Chinesisch, Thailändisch Restaurants in Berlin, Heidelberg, München

-- Backup-System: Prüfe ob Backup existiert und lade Daten
DO $$
BEGIN
    -- Prüfe ob backup_metadata Tabelle existiert
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'backup_metadata') THEN
        -- Wenn Backup existiert, lade Daten aus Backup-Tabellen
        RAISE NOTICE 'Backup gefunden - lade Daten aus letztem Backup';
        
        -- Lade Kunden aus Backup falls vorhanden
        IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'customers_backup') THEN
            INSERT INTO customers SELECT * FROM customers_backup ON CONFLICT (id) DO NOTHING;
        END IF;
        
        -- Lade Bestellungen aus Backup falls vorhanden
        IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'orders_backup') THEN
            INSERT INTO orders SELECT * FROM orders_backup ON CONFLICT (id) DO NOTHING;
        END IF;
        
        -- Lade Produktdaten aus Backup falls vorhanden
        IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'products_backup') THEN
            INSERT INTO products SELECT * FROM products_backup ON CONFLICT (sku) DO NOTHING;
        END IF;
        
    ELSE
        RAISE NOTICE 'Kein Backup gefunden - erstelle Demo-Daten';
    END IF;
END $$;

-- Erweiterte Produkttabelle mit neuen Feldern
CREATE TABLE IF NOT EXISTS products (
    sku VARCHAR(50) PRIMARY KEY,
    name_de VARCHAR(200) NOT NULL,
    name_en VARCHAR(200),
    name_vi VARCHAR(200),
    category VARCHAR(100),
    unit VARCHAR(20),
    base_price_eur DECIMAL(10,2),
    origin VARCHAR(100),
    allergens VARCHAR(200),
    notes VARCHAR(500),
    description TEXT,
    description_vi TEXT,
    description_en TEXT,
    image_url VARCHAR(500),
    available BOOLEAN DEFAULT true,
    external_id VARCHAR(100),
    last_sync TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ai_generated BOOLEAN DEFAULT false,
    price_tiers JSONB,
    estimated_weight VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Backup-Metadaten Tabelle
CREATE TABLE IF NOT EXISTS backup_metadata (
    id SERIAL PRIMARY KEY,
    backup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    backup_type VARCHAR(50),
    table_name VARCHAR(100),
    record_count INTEGER,
    status VARCHAR(50)
);

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

-- Nur Demo-Daten einfügen wenn keine Backup-Daten vorhanden
INSERT INTO customers VALUES
('rest_001', 'Saigon Sushi Berlin', 'Nguyen Van Duc', 'Sushi', 'Berlin', 'vi', 450.00, 12, 'Premium'),
('rest_002', 'Golden Dragon', 'Tran Thi Mai', 'Chinesisch', 'Heidelberg', 'vi', 320.00, 8, 'Standard'),
('rest_003', 'Thai Lotus München', 'Le Van Minh', 'Thailändisch', 'München', 'vi', 280.00, 6, 'Standard'),
('rest_004', 'Hanoi Sushi House', 'Pham Thi Lan', 'Sushi', 'Berlin', 'vi', 520.00, 15, 'Premium'),
('rest_005', 'Mekong Palace', 'Vo Van Thanh', 'Chinesisch', 'München', 'vi', 380.00, 10, 'Premium'),
('rest_006', 'Bamboo Garden', 'Hoang Thi Nga', 'Thailändisch', 'Heidelberg', 'vi', 250.00, 5, 'Standard')
ON CONFLICT (id) DO NOTHING;

-- Demo-Produkte mit erweiterten Feldern
INSERT INTO products (sku, name_de, name_en, name_vi, category, unit, base_price_eur, origin, allergens, notes, description, price_tiers, estimated_weight) VALUES
('TT-SAL-FI-001', 'Norwegischer Lachsfilet (frisch)', 'Norwegian Salmon Fillet (fresh)', 'Phi-lê cá hồi Na Uy (tươi)', 'Lachs', 'kg', 16.90, 'Norwegen (Zucht)', 'Fisch', 'Sushi/Sashimi Grade A', 
 'Norwegischer Lachs – Nährwerte & Herkunft

Allgemeine Beschreibung:
Der norwegische Lachs (Salmo salar) ist ein hochwertiger Speisefisch, der in den kalten und sauberen Fjorden Norwegens gezüchtet wird. Dank der kontrollierten Aquakultur gilt er als besonders nachhaltig und sicher im Verzehr.

Nährwerte pro 100g:
Kalorien: ca. 200–210 kcal
Eiweiß: 20–22 g
Fett: 13–15 g (davon Omega-3-Fettsäuren: ca. 2,5 g)
Vitamin D: ca. 11 µg (mehr als 100 % des Tagesbedarfs)
Vitamin B12: ca. 3 µg
Jod, Selen, Phosphor

Gesundheitliche Vorteile:
Fördert die Herzgesundheit dank Omega-3-Fettsäuren
Unterstützt Gehirnfunktion und Sehkraft
Stärkt das Immunsystem durch Vitamin D und Selen
Hilft beim Muskelaufbau durch hochwertiges Eiweiß

Haltung & Herkunft:
Der Fisch wächst in offenen Netzgehegen im Meer auf, mit ständigem Frischwasserzufluss und unter streng kontrollierten Bedingungen. Die norwegische Lachszucht zählt zu den modernsten und nachhaltigsten weltweit.

Verwendung:
Norwegischer Lachs eignet sich hervorragend für Sushi, zum Braten, Grillen oder Räuchern.',
 '{"5/6kg": 28.50, "6/7kg": 32.90}', '20kg/karton/4 Fische'),

('TT-TUN-LO-003', 'Yellowfin-Thunfisch Loin (frisch)', 'Yellowfin Tuna Loin (fresh)', 'Cá ngừ vây vàng - thăn (tươi)', 'Thunfisch', 'kg', 24.90, 'FAO 51/71', 'Fisch', 'Sashimi-Qualität Premium', 
 'Premium Yellowfin-Thunfisch aus nachhaltiger Fischerei. Perfekt für Sushi und Sashimi.', NULL, NULL),

('TT-SHR-BT-02630', 'Black Tiger Garnelen 26/30 (roh gefroren)', 'Black Tiger Prawns 26/30 (raw frozen)', 'Tôm sú 26/30 (đông lạnh)', 'Garnelen', '1kg-Beutel', 12.90, 'Asien (Zucht)', 'Krebstiere', 'IQF für Sushi', 
 'Frische Black Tiger Garnelen aus kontrollierter Zucht. Ideal für asiatische Küche.', NULL, NULL)
ON CONFLICT (sku) DO NOTHING;

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
('ord_005', 'rest_004', '2024-09-25', 680.50, 'Bestätigt', '2024-09-27')
ON CONFLICT (id) DO NOTHING;

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
('item_009', 'ord_005', 'TT-EEL-UNA-500', 15.0, 18.50)
ON CONFLICT (id) DO NOTHING;

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
('rest_006', 'Tintenfisch', 0.85)
ON CONFLICT (customer_id, category) DO NOTHING;

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
('München', 18, 16, 330.00, '+35%', 'Lachs,Jakobsmuscheln,Aal')
ON CONFLICT (region) DO NOTHING;

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
 'Unagi Aal für gehobene chinesische Küche', 'Lươn Unagi cho ẩm thực Trung Hoa cao cấp', NOW())
ON CONFLICT (id) DO NOTHING;

-- Backup-Funktionen
CREATE OR REPLACE FUNCTION create_backup() RETURNS void AS $$
BEGIN
    -- Erstelle Backup-Tabellen
    DROP TABLE IF EXISTS customers_backup;
    DROP TABLE IF EXISTS orders_backup;
    DROP TABLE IF EXISTS products_backup;
    
    CREATE TABLE customers_backup AS SELECT * FROM customers;
    CREATE TABLE orders_backup AS SELECT * FROM orders;
    CREATE TABLE products_backup AS SELECT * FROM products;
    
    -- Protokolliere Backup
    INSERT INTO backup_metadata (backup_type, table_name, record_count, status)
    VALUES 
    ('full', 'customers', (SELECT COUNT(*) FROM customers), 'completed'),
    ('full', 'orders', (SELECT COUNT(*) FROM orders), 'completed'),
    ('full', 'products', (SELECT COUNT(*) FROM products), 'completed');
    
    RAISE NOTICE 'Backup erfolgreich erstellt';
END;
$$ LANGUAGE plpgsql;

-- Trigger für automatische Backups bei Änderungen
CREATE OR REPLACE FUNCTION auto_backup_trigger() RETURNS trigger AS $$
BEGIN
    -- Erstelle Backup bei größeren Änderungen
    IF TG_OP = 'DELETE' OR (TG_OP = 'UPDATE' AND OLD IS DISTINCT FROM NEW) THEN
        PERFORM create_backup();
    END IF;
    
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger für wichtige Tabellen
DROP TRIGGER IF EXISTS backup_trigger_products ON products;
CREATE TRIGGER backup_trigger_products
    AFTER UPDATE OR DELETE ON products
    FOR EACH ROW EXECUTE FUNCTION auto_backup_trigger();

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_available ON products(available);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(order_date);
CREATE INDEX IF NOT EXISTS idx_backup_metadata_date ON backup_metadata(backup_date);
