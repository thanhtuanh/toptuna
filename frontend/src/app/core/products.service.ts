import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from './api.config';

export interface Product {
  sku: string; nameDe: string; nameVi: string; category: string;
  unit: string; basePriceEur: number; origin: string; allergens: string; notes: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}
  list(q?: string, category?: string) {
    const params: any = {};
    if (q) params.q = q;
    if (category) params.category = category;
    return this.http.get<Product[]>(`${API_BASE}/catalog/products`, { params });
  }
}
