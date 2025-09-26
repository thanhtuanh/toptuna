import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from './api.config';

@Injectable({ providedIn: 'root' })
export class HealthService {
  constructor(private http: HttpClient) {}
  ping(service: 'auth'|'catalog'|'orders'|'logistics'|'crm'|'export') {
    return this.http.get(API_BASE + `/${service}/health`, { responseType: 'text' });
  }
}
