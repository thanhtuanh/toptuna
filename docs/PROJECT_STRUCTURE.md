# TopTuna MVP - Project Structure

## Complete Full-Stack Architecture

```
toptuna-mvp/
├── pom.xml                     # Parent POM (Java 21, Spring Boot 3.3.2)
├── README.md                   # Main documentation
├── .gitignore                  # Git ignore rules
├── ops/
│   └── docker-compose.yml      # Complete stack orchestration
├── frontend/                   # Angular 17 Frontend
│   ├── Dockerfile              # Multi-stage build (Node + Nginx)
│   ├── package.json            # Angular dependencies
│   ├── angular.json            # Angular CLI configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── src/
│       ├── index.html          # Main HTML template
│       ├── main.ts             # Bootstrap application
│       ├── styles.css          # Global styles
│       ├── environments/       # Environment configurations
│       │   ├── environment.ts      # Local (localhost:8080)
│       │   └── environment.prod.ts # Production (render.com)
│       ├── assets/i18n/        # Internationalization
│       │   ├── de.json         # German translations
│       │   ├── en.json         # English translations
│       │   └── vi.json         # Vietnamese translations
│       └── app/
│           ├── app.config.ts   # App configuration & providers
│           ├── app.routes.ts   # Routing configuration
│           ├── app.component.* # Root component
│           ├── core/           # Core services
│           │   ├── api.config.ts    # API base URL
│           │   ├── health.service.ts # Health check service
│           │   └── products.service.ts # Product API service
│           ├── features/       # Feature components
│           │   ├── tiles/tiles.component.ts    # Service status dashboard
│           │   └── catalog/catalog.component.ts # Product catalog
│           └── shared/         # Shared components
│               └── lang-switch/lang-switch.component.ts # Language switcher
├── gateway/                    # Spring Cloud Gateway (Port 8080)
│   ├── Dockerfile              # Multi-stage build
│   ├── pom.xml                 # Gateway dependencies
│   └── src/main/
│       ├── resources/application.yml # Gateway routing & CORS
│       └── java/com/toptuna/gateway/
│           ├── GatewayApplication.java  # Main application
│           ├── CorsConfig.java         # CORS configuration
│           └── HealthController.java   # Health endpoint
├── auth-service/               # JWT Authentication (Port 8081)
│   ├── Dockerfile              # Multi-stage build
│   ├── pom.xml                 # Auth dependencies (WebFlux, Security, JWT)
│   └── src/main/
│       ├── resources/application.yml # Port configuration
│       └── java/com/toptuna/auth/
│           ├── AuthApplication.java    # Main application
│           ├── HealthController.java   # Health endpoint
│           ├── LoginDto.java           # Login request DTO
│           ├── JwtUtil.java            # JWT token utility
│           ├── AuthController.java     # Login endpoint
│           └── SecurityConfig.java     # Security configuration
├── catalog-service/            # Product Catalog (Port 8082)
│   ├── Dockerfile              # Multi-stage build
│   ├── pom.xml                 # Catalog dependencies (Web, CSV)
│   └── src/main/
│       ├── resources/
│       │   ├── application.yml # Port & CSV configuration
│       │   └── seeds/toptuna_demo_products.csv # Sample data
│       └── java/com/toptuna/catalog/
│           ├── CatalogApplication.java     # Main application
│           ├── HealthController.java       # Health endpoint
│           ├── Product.java                # Product record
│           ├── ProductCsvLoader.java       # CSV data loader
│           └── ProductController.java      # Product API
└── order-service/              # Order Management Skeleton (Port 8083)
    ├── Dockerfile              # Multi-stage build
    ├── pom.xml                 # Order dependencies (Web)
    └── src/main/
        ├── resources/application.yml # Port configuration
        └── java/com/toptuna/orders/
            ├── OrderApplication.java   # Main application
            └── HealthController.java   # Health endpoint
```

## Key Features

### Frontend (Angular 17)
- **Multi-language**: German, English, Vietnamese
- **Service Dashboard**: Real-time health status tiles
- **Product Catalog**: Search, filter, bilingual display
- **Responsive Design**: Mobile-friendly UI
- **Environment-aware**: Local vs Production API endpoints

### Backend Services
- **Gateway**: Centralized routing, CORS, security headers
- **Auth**: JWT-based authentication (MVP mode - accepts any credentials)
- **Catalog**: CSV-seeded product database with search
- **Orders**: Skeleton service for future expansion

### DevOps
- **Docker**: Multi-stage builds for all services
- **Compose**: Complete stack orchestration
- **Maven**: Multi-module build system
- **Java 21**: Modern Java features (records, etc.)

## Quick Commands

```bash
# Build all services
mvn -q -DskipTests package

# Start complete stack
docker compose -f ops/docker-compose.yml up --build

# Frontend only (development)
cd frontend && npm install && npm start

# Individual service build
mvn -pl gateway -q -DskipTests package
```

## Deployment Ready
- **Local**: Docker Compose with hot-reload
- **Render.com**: Individual service deployment
- **Production**: Environment-specific configurations
