import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssetService } from '../config/sized-assets.config';

const API_BASE = 'http://localhost:8080/api';

export interface Product {
  sku: string;
  nameDe: string;
  nameEn?: string;
  nameVi?: string;
  category: string;
  unit: string;
  basePriceEur: number;
  origin: string;
  allergens?: string;
  notes?: string;
  description?: string;
  descriptionVi?: string;
  descriptionEn?: string;
  imageUrl?: string;
  available: boolean;
  externalId?: string;
  lastSync?: string;
  aiGenerated: boolean;
  priceTiers?: { [key: string]: number };
  estimatedWeight?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  getFallbackImage(product: Product, context: 'icon' | 'thumbnail' | 'list' | 'detail' = 'list'): string {
    const category = product.category.toLowerCase();
    const name = `${product.nameDe} ${product.nameEn || ''} ${product.nameVi || ''}`.toLowerCase();
    
    let productKey = 'default';
    
    if (category.includes('lachs') || name.includes('lachs') || name.includes('salmon')) {
      productKey = 'lachs';
    } else if (category.includes('thunfisch') || name.includes('thunfisch') || name.includes('tuna')) {
      productKey = 'thunfisch';
    } else if (category.includes('garnelen') || name.includes('garnelen') || name.includes('shrimp') || name.includes('prawns')) {
      productKey = 'garnelen';
    } else if (category.includes('krabbe') || name.includes('krabbe') || name.includes('crab')) {
      productKey = 'krabbe';
    } else if (category.includes('tintenfisch') || name.includes('tintenfisch') || name.includes('squid')) {
      productKey = 'tintenfisch';
    }
    
    return AssetService.getImageForContext(productKey, context);
  }

  list(q?: string, category?: string): Observable<Product[]> {
    const params: any = {};
    if (q) params.q = q;
    if (category) params.category = category;
    
    return this.http.get<Product[]>(`${API_BASE}/catalog/products`, { params }).pipe(
      map(products => products.map(product => ({
        ...product,
        imageUrl: this.getFallbackImage(product)
      })))
    );
  }
}
