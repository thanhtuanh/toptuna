# Build Stage
FROM node:18 AS build
WORKDIR /app

# Kopiere nur package-lock / package.json zuerst für besseren Layer-Caching
COPY package.json package-lock.json ./
RUN npm ci --silent

# Kopiere restlichen Quellcode und baue
COPY . .
RUN npm run build --silent

# Final Stage mit nginx + SPA Fallback
FROM nginx:alpine
# optional: entferne default config (wird durch unsere ersetzt)
RUN rm -f /etc/nginx/conf.d/default.conf

# Kopiere unsere nginx config (muss im Build-Context liegen)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Kopiere gebaute Angular-Dateien
COPY --from=build /app/dist/toptuna-frontend /usr/share/nginx/html

EXPOSE 80
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
