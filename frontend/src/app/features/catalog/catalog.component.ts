import { Component } from '@angular/core';
import { ProductsService, Product } from '../../core/products.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-catalog',
  styleUrls: ['./catalog.component.css'],
  template: `
  <div class="catalog-page">
    <div class="page-header">
      <h1 class="page-title">🐟 Fischkatalog</h1>
      <p class="page-subtitle">Premium Fisch & Meeresfrüchte für die Gastronomie</p>
    </div>

    <div class="search-section">
      <div class="search-box">
        <input 
          type="text" 
          placeholder="Produkte durchsuchen..." 
          (input)="q=$any($event.target).value; load()"
          class="search-input">
        <div class="search-icon">🔍</div>
      </div>
      <div class="catalog-stats">
        <span class="stat-item">{{items.length}} Produkte</span>
        <span class="stat-item">6 Kategorien</span>
      </div>
    </div>

    <div class="catalog-table-container">
      <table class="catalog-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Produktname</th>
            <th>Kategorie</th>
            <th>Einheit</th>
            <th>Preis</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of items; trackBy: trackBySku" class="product-row">
            <td>
              <span class="sku-badge">{{p.sku}}</span>
            </td>
            <td>
              <div class="product-name">
                <strong>{{ getCurrentLang() === 'vi' ? p.nameVi : p.nameDe }}</strong>
              </div>
            </td>
            <td>
              <span class="category-tag">{{p.category}}</span>
            </td>
            <td>{{p.unit}}</td>
            <td>
              <div class="price-display">
                <span class="price">{{p.basePriceEur | number:'1.2-2'}} €</span>
                <small class="price-unit">pro {{p.unit}}</small>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div *ngIf="!items.length" class="empty-state">
        <div class="empty-icon">🐟</div>
        <h3>Keine Produkte gefunden</h3>
        <p>Versuchen Sie eine andere Suche.</p>
      </div>
    </div>
  </div>
  `,
  imports: [NgFor, NgIf, FormsModule, DecimalPipe]
})
export class CatalogComponent {
  items: Product[] = [];
  q = '';
  
  constructor(private api: ProductsService, private translate: TranslateService) {
    this.load();
  }
  
  load() { 
    this.api.list(this.q).subscribe({
      next: res => this.items = res,
      error: err => console.log('Load failed', err)
    }); 
  }

  getCurrentLang(): string {
    return this.translate.currentLang || 'de';
  }

  trackBySku(index: number, product: Product): string {
    return product.sku;
  }
}