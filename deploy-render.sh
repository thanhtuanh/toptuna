#!/bin/bash
# TopTuna Render.com Deployment Script

echo "🐟 TopTuna B2B Portal - Render.com Deployment"
echo "=============================================="

# Check if render CLI is installed
if ! command -v render &> /dev/null; then
    echo "❌ Render CLI not found. Installing..."
    npm install -g @render/cli
fi

# Login to Render (if not already logged in)
echo "🔐 Checking Render authentication..."
render auth login

# Create services from render.yaml
echo "🚀 Deploying services to Render..."
render services create --file render.yaml

echo "✅ Deployment initiated!"
echo ""
echo "📋 Next steps:"
echo "1. Check deployment status: https://dashboard.render.com"
echo "2. Frontend will be available at: https://toptuna-frontend.onrender.com"
echo "3. API Gateway at: https://toptuna-gateway.onrender.com"
echo ""
echo "🔧 GitHub Secrets needed for CI/CD:"
echo "- RENDER_API_KEY: Your Render API key"
echo "- RENDER_SERVICE_ID: Service ID from Render dashboard"
echo ""
echo "🎯 Demo Login:"
echo "- Admin: admin / admin"
echo "- Restaurant: saigon_sushi / test"
