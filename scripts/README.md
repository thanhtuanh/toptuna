# TopTuna B2B Portal - Scripts

## 🚀 Quick Start Scripts

### `start.sh` - Start Complete Stack
```bash
./scripts/start.sh
```
- Builds all Maven services
- Starts Docker Compose stack
- Checks service health
- Shows access points

### `stop.sh` - Stop All Services
```bash
./scripts/stop.sh
```
- Stops Docker containers
- Cleans up volumes
- Shows final status

## 🧪 Testing Scripts

### `test-api.sh` - Complete API Test Suite
```bash
./scripts/test-api.sh
```
**Tests all endpoints:**
- ✅ Health checks (6 services)
- 🔐 Authentication (admin, restaurant users)
- 🐟 Product catalog (30 fish products)
- 📦 Order management
- 🚚 Logistics & HACCP tracking
- 👥 CRM & customer segments
- 📊 Export & DATEV integration

### `demo.sh` - Quick Live Demo
```bash
./scripts/demo.sh
```
**Showcases key features:**
- Admin dashboard login
- Premium fish catalog
- Vietnamese restaurant customers
- HACCP delivery tracking
- Business KPIs
- DATEV export

## 🛠️ Development Scripts

### `dev.sh` - Development Helper
```bash
# Build all services
./scripts/dev.sh build

# Show logs
./scripts/dev.sh logs
./scripts/dev.sh logs gateway

# Restart services
./scripts/dev.sh restart
./scripts/dev.sh restart auth

# Check status
./scripts/dev.sh status

# Clean up
./scripts/dev.sh clean
```

## 📋 API Endpoints Tested

### Authentication
- `POST /api/auth/login` - Admin & restaurant login
- `GET /api/auth/users` - Demo users list

### Product Catalog
- `GET /api/catalog/products` - All 30 fish products
- `GET /api/catalog/products?category=Lachs` - Category filter
- `GET /api/catalog/products?q=Thunfisch` - Search

### Order Management
- `GET /api/orders/recent` - Recent orders
- `GET /api/orders/customer/{id}` - Customer orders

### Logistics & HACCP
- `GET /api/logistics/routes/today` - Today's routes
- `GET /api/logistics/routes/{id}/packlist` - Route packlist
- `POST /api/logistics/routes/{id}/stops/{id}/deliver` - Delivery confirmation

### CRM & Customers
- `GET /api/crm/customers/segments` - Customer segments
- `GET /api/crm/campaigns/active` - Active campaigns
- `GET /api/crm/customers/{id}/history` - Customer history

### Export & Reporting
- `GET /api/export/datev/invoices` - DATEV export
- `GET /api/export/admin/dashboard` - Admin dashboard

## 🎯 Business Scenarios Tested

1. **Vietnamese Restaurant Owner Workflow**
   - Login → Browse Products → Check History → View Campaigns

2. **Admin Dashboard Management**
   - Service monitoring → Customer analytics → Export reports

3. **Logistics & Delivery**
   - Route planning → HACCP tracking → Delivery confirmation

4. **B2B Features**
   - Tier pricing → Customer segments → Loyalty programs
