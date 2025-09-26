# TopTuna B2B Portal - Deployment Guide

## 🚀 Render.com Deployment (Recommended)

### Quick Deploy
```bash
# 1. Install Render CLI
npm install -g @render/cli

# 2. Run deployment script
./deploy-render.sh
```

### Manual Deployment
1. **Fork/Clone** this repository to your GitHub
2. **Connect to Render**: Link your GitHub repo to Render.com
3. **Import Services**: Use `render.yaml` to create all services
4. **Set Environment Variables**: All configured in render.yaml

### Service URLs (after deployment)
- **Frontend**: https://toptuna-frontend.onrender.com
- **API Gateway**: https://toptuna-gateway.onrender.com
- **Individual Services**: https://toptuna-[service].onrender.com

## 🔧 GitHub CI/CD Setup

### Required Secrets
Add these to your GitHub repository secrets:
```
RENDER_API_KEY=your_render_api_key
RENDER_SERVICE_ID=your_service_id
```

### Automatic Deployment
- **Push to main** → Automatic deployment
- **Pull Request** → Test build only
- **Build Status** → Visible in GitHub Actions

## 🐟 Complete Product Catalog

**30 Premium Fish Products** including:
- **Lachs**: Norwegisch, Schottisch, Ganz (3 Varianten)
- **Thunfisch**: Yellowfin, Steaks, Tataki (3 Varianten)  
- **Garnelen**: Black Tiger, White Shrimps, King Prawns (3 Varianten)
- **Aal**: Unagi, Räucheraal (2 Varianten)
- **Edelfisch**: Wolfsbarsch, Dorade, Kabeljau, Heilbutt (4 Varianten)
- **Meeresfrüchte**: Tintenfisch, Oktopus, Jakobsmuscheln, Austern (8 Varianten)
- **Krebstiere**: Hummer, Krabben, Flusskrebse (3 Varianten)
- **Weitere**: Seeteufel, Rotbarsch, Makrele, Sardinen (4 Varianten)

## 🎯 Demo Access
- **Admin Dashboard**: admin / admin
- **Restaurant Owner**: saigon_sushi / test
- **Driver**: driver_duc / test
- **Dispatcher**: dispo_mai / test

## 📊 Features Ready
- ✅ **6 Microservices** (Auth, Catalog, Orders, Logistics, CRM, Export)
- ✅ **Admin Dashboard** with health monitoring
- ✅ **Vietnamese Localization** for restaurant owners
- ✅ **HACCP Logistics** with temperature tracking
- ✅ **DATEV Export** for accounting
- ✅ **Role-based Access** (Admin/Customer/Driver/Dispatcher)

## 💰 Render.com Costs
- **Free Tier**: 750 hours/month (sufficient for demo)
- **Paid Services**: ~$7/month per service (production)
- **Total Estimate**: ~$50/month for full production stack
