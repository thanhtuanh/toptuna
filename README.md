# TopTuna B2B Portal - Fischgroßhandel für Gastronomie

**B2B-Portal für Großhändler & vietnamesische Restaurants** - Bestellung, Logistik, CRM, DATEV-Integration  
Java 21, Spring Boot 3, PostgreSQL, Angular 17, Docker

## 🎯 **Zielbild**
B2B-Portal für Großhändler & Gastronomie mit Bestell- → Kommissionier- → Liefer-Workflow inkl. Kühlkette/HACCP-Notizen, CRM und DATEV-Export.

## 🚀 **Quick Deploy to Render.com**

### One-Click Deployment
```bash
# Install Render CLI and deploy
npm install -g @render/cli
./deploy-render.sh
```

### Production URLs
- **Frontend**: https://toptuna-frontend.onrender.com
- **API Gateway**: https://toptuna-gateway.onrender.com
- **Admin Login**: admin / admin

### GitHub CI/CD
- **Auto-deploy** on push to main
- **Test builds** on pull requests
- **Full stack** deployment with render.yaml

---

## 🏠 **Local Development**

### Build & Run Complete Stack
```bash
# Build all services
mvn -q -DskipTests package

# Start with PostgreSQL
docker compose -f ops/docker-compose.yml up --build

# Or use convenience scripts
./scripts/start.sh    # Start complete stack
./scripts/test-api.sh # Test all APIs
./scripts/demo.sh     # Quick demo
```

### Access Points
- **Frontend**: http://localhost:4200
- **Gateway**: http://localhost:8080/health
- **API Endpoints**:
  - Auth: http://localhost:8080/api/auth/login
  - Products: http://localhost:8080/api/catalog/products?category=Lachs
  - Orders: http://localhost:8080/api/orders/customer/rest_001
  - Logistics: http://localhost:8080/api/logistics/routes/today
  - CRM: http://localhost:8080/api/crm/customers/segments
  - Export: http://localhost:8080/api/export/datev/invoices

## 🎨 **Professional Frontend**

### Multi-Language Support (DE/EN/VI)
- **German** - Primary business language
- **English** - International communication
- **Vietnamese** - Native language for restaurant owners

### TopTuna.de Design
- **Professional blue theme** matching corporate identity
- **Interactive service dashboard** with real-time monitoring
- **Demo data testing** for all business functions
- **Responsive design** for desktop and mobile

### Demo Users
| Username | Password | Role | Description |
|----------|----------|------|-------------|
| `admin` | `admin` | Administrator | Full system access |
| `saigon_sushi` | `test` | Restaurant Owner | Vietnamese Sushi restaurant |
| `driver_duc` | `test` | Driver | HACCP delivery tracking |
| `dispo_mai` | `test` | Dispatcher | Route planning |

## 🏗️ **Architecture**
- **Frontend**: Angular 17 (DE/VI/EN) + PWA - Port 4200
- **Gateway**: Spring Cloud Gateway - Port 8080  
- **Auth Service**: JWT + Rollen (Admin/Dispo/Fahrer/Kunde) - Port 8081
- **Catalog Service**: Produktkatalog + Staffelpreise - Port 8082
- **Order Service**: Warenkorb + Bestellmanagement - Port 8083
- **Logistics Service**: Tour-/Lieferplanung + HACCP - Port 8084
- **CRM Service**: Kundendaten + Segmente + Kampagnen - Port 8085
- **Export Service**: DATEV/CSV Export - Port 8086

## 🐟 **Business Features**

### **Bestellprozess**
- Kategorie wählen → Warenkorb → Lieferfenster → Bestellung
- Mindestbestellmenge, Staffelpreise, Zahlungsart (Rechnung)
- Bestellbestätigung DE/VI per E-Mail/SMS

### **Logistik-Workflow**
- Tour-/Lieferplanung mit Slots
- Packliste (PDF), Lieferstatus
- HACCP-Notizen, Kühlkette-Tracking

### **CRM & Segmentierung**
- Kundendaten, Ansprechpartner, Notizen
- Segmente: "Sushi", "Pho", "Thai", "Chinesisch"
- Kampagnen, Loyalty-Programme

### **Export & Integration**
- DATEV-Export (Rechnungen, Debitoren)
- CSV-Export für Buchhaltung
- Admin-Dashboard: Tagesumsatz, offene Bestellungen

### **Mehrsprachigkeit**
- UI + Produkttexte (DE/VI), Fallback EN
- Vietnamesische Fachbegriffe für Gastronomie
- Kulturspezifische Ansprache

## 📊 **Demo Data**

### **30 Premium Fish Products**
- **Lachs** (3): Norwegisch, Schottisch, Ganzer Lachs
- **Thunfisch** (3): Yellowfin Loin, Steaks, Tataki
- **Garnelen** (3): Black Tiger, White Shrimps, King Prawns
- **Aal** (2): Unagi, Räucheraal
- **Edelfisch** (4): Wolfsbarsch, Dorade, Kabeljau, Heilbutt
- **Meeresfrüchte** (8): Tintenfisch, Oktopus, Jakobsmuscheln, Austern
- **Krebstiere** (3): Hummer, Schneekrabben, Flusskrebse
- **Weitere** (4): Seeteufel, Rotbarsch, Makrele, Sardinen

### **Vietnamese Restaurant Customers**
- **91 Kunden** in Berlin (45), Heidelberg (28), München (18)
- **Segmente**: Sushi, Chinesisch, Thai-Restaurants
- **Realistische Bestelldaten** mit Lieferhistorie

## 🧪 **Testing & Scripts**

### **Management Scripts**
```bash
./scripts/start.sh    # Start complete stack with health checks
./scripts/stop.sh     # Clean shutdown
./scripts/dev.sh      # Development utilities (build, logs, restart)
```

### **API Testing**
```bash
./scripts/test-api.sh # Complete API test suite (25+ endpoints)
./scripts/demo.sh     # Live business demo
```

### **Comprehensive Testing**
- ✅ **6 Microservices** with health monitoring
- ✅ **Authentication** with role-based access
- ✅ **30 Fish Products** with Vietnamese names
- ✅ **HACCP Logistics** with temperature tracking
- ✅ **CRM Segments** for restaurant types
- ✅ **DATEV Export** for German accounting

## 📋 **Project Structure**
```
toptuna-b2b/
├── frontend/              # Angular 17 PWA (DE/VI/EN)
├── gateway/              # Spring Cloud Gateway + Security
├── auth-service/         # JWT + Rollen-Management
├── catalog-service/      # Produktkatalog + Staffelpreise
├── order-service/        # Warenkorb + Bestellmanagement
├── logistics-service/    # Tour-/Lieferplanung + HACCP
├── crm-service/         # CRM + Kundensegmente + Kampagnen
├── export-service/      # DATEV/CSV Export
├── scripts/             # Management & Testing Scripts
├── ops/                 # Docker + PostgreSQL + init.sql
├── BENUTZERANLEITUNG.md # Complete user guide
├── TESTING.md           # Testing documentation
└── DEPLOYMENT.md        # Deployment guide
```

## 🎯 **MVP-Umfang (12 Wochen)**
**Was Kunden sofort spüren**: Einfache Bestellung, klare Preise, Bestellhistorie, Lieferavis per Mail/SMS (DE/VI)

### **Roadmap**
- **Woche 1-2**: Foundation (Auth, DB, Angular Shell)
- **Woche 3-4**: Katalog & Bestellung (Warenkorb, Validierung)
- **Woche 5-6**: Logistik (Lieferfenster, Tourplanung, PDF)
- **Woche 7-8**: CRM (Segmente, Historie, Nachbestellung)
- **Woche 9**: Export (DATEV, Admin-Dashboard)
- **Woche 10**: Mehrsprachige Inhalte (DE/VI Produkttexte)
- **Woche 11**: Pilot-Test (3-5 vietnamesische Restaurants)
- **Woche 12**: Go-Live TopTuna

## 📈 **KPIs (Pilot)**
- **Conversion**: 30-50% der Restaurants bestellen binnen 2 Wochen
- **Wiederkauf**: ≥60% binnen 30 Tagen  
- **Support**: <10 min pro Bestellung
- **Fehlerrate**: <1% (falsche Position/Menge)
- **Lieferpünktlichkeit**: ≥95%

## 👥 **Rollen & Rechte**
- **Admin**: Vollzugriff, Konfiguration, Reports
- **Dispo**: Bestellungen, Tourplanung, Kommissionierung  
- **Fahrer**: Tourdaten, Lieferstatus, HACCP-Notizen
- **Kunde (Restaurant)**: Bestellung, Historie, eigene Preise

---

**TopTuna B2B Portal** - Professioneller Fischgroßhandel für vietnamesische Restaurants in Deutschland 🐟🇩🇪🇻🇳
