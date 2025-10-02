import { environment } from '../../environments/environment';

export const API_CONFIG = {
  BASE_URL: environment.production ? 'https://api.toptuna.de/api' : 'http://localhost:8080/api',
  ENDPOINTS: {
    AUTH: '/auth',
    CATALOG: '/catalog',
    ORDERS: '/orders',
    LOGISTICS: '/logistics',
    CRM: '/crm',
    EXPORT: '/export'
  }
} as const;

export const API_BASE = API_CONFIG.BASE_URL;
