import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductsService, Product } from '../../core/products.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-catalog',
  styleUrls: ['./catalog.component.css'],
  template: `
  <div class="catalog-page">
    <div class="page-header">
      <h1 class="page-title">🐟 {{ 'catalog.title' | translate }}</h1>
      <p class="page-subtitle">{{ 'catalog.subtitle' | translate }}</p>
    </div>

    <div class="search-section">
      <div class="search-box">
        <input 
          type="text" 
          [placeholder]="'catalog.searchPlaceholder' | translate"
          (input)="q=$any($event.target).value; load()"
          class="search-input">
        <div class="search-icon">🔍</div>
      </div>
      <div class="catalog-stats">
        <span class="stat-item">{{ 'catalog.stats.products' | translate:{ count: items.length } }}</span>
        <span class="stat-item">{{ 'catalog.stats.categories' | translate:{ count: categoryCount } }}</span>
      </div>
    </div>

    <div class="catalog-table-container">
      <table class="catalog-table">
        <thead>
          <tr>
            <th>{{ 'catalog.table.sku' | translate }}</th>
            <th>{{ 'catalog.table.name' | translate }}</th>
            <th>{{ 'catalog.table.category' | translate }}</th>
            <th>{{ 'catalog.table.unit' | translate }}</th>
            <th>{{ 'catalog.table.price' | translate }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of items; trackBy: trackBySku" class="product-row">
            <td>
              <span class="sku-badge">{{p.sku}}</span>
            </td>
            <td>
              <div class="product-name">
                <strong>{{ productName(p) }}</strong>
              </div>
            </td>
            <td>
              <span class="category-tag">{{p.category}}</span>
            </td>
            <td>{{p.unit}}</td>
            <td>
              <div class="price-display">
                <span class="price">{{p.basePriceEur | number:'1.2-2'}} €</span>
                <small class="price-unit">{{ 'catalog.table.pricePerUnit' | translate:{ unit: p.unit } }}</small>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div *ngIf="!items.length" class="empty-state">
        <div class="empty-icon">🐟</div>
        <h3>{{ 'catalog.empty.title' | translate }}</h3>
        <p>{{ 'catalog.empty.message' | translate }}</p>
      </div>
    </div>
  </div>
  `,
  imports: [NgFor, NgIf, FormsModule, DecimalPipe, TranslateModule]
})
export class CatalogComponent implements OnInit {
  items: Product[] = [];
  q = '';
  categoryCount = 0;
  
  constructor(
    private api: ProductsService, 
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDemoData();
    this.load();
  }
  
  load() { 
    this.api.list(this.q).subscribe({
      next: res => {
        this.items = res;
        this.categoryCount = Array.from(new Set(res.map(item => item.category))).length;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('API failed, using demo data', err);
        this.loadDemoData();
      }
    }); 
  }

  loadDemoData() {
    this.items = [
      { sku: 'TT-LAC-FR-001', nameDe: 'Atlantik Lachs Filet', nameVi: 'Phi lê cá hồi Đại Tây Dương', category: 'Lachs', unit: 'kg', basePriceEur: 24.50, origin: 'Norwegen', available: true, aiGenerated: false },
      { sku: 'TT-THU-FR-002', nameDe: 'Gelbflossenthun Sashimi', nameVi: 'Cá ngừ vây vàng sashimi', category: 'Thunfisch', unit: 'kg', basePriceEur: 45.00, origin: 'Pazifik', available: true, aiGenerated: false },
      { sku: 'TT-GAR-TK-003', nameDe: 'Tiger Garnelen 16/20', nameVi: 'Tôm hùm 16/20', category: 'Garnelen', unit: 'kg', basePriceEur: 18.75, origin: 'Vietnam', available: true, aiGenerated: false },
      { sku: 'TT-KRA-LE-004', nameDe: 'Königskrabbe Beine', nameVi: 'Chân cua hoàng gia', category: 'Krabben', unit: 'kg', basePriceEur: 65.00, origin: 'Alaska', available: true, aiGenerated: false },
      { sku: 'TT-TIN-FR-005', nameDe: 'Tintenfisch Ringe', nameVi: 'Vòng mực', category: 'Tintenfisch', unit: 'kg', basePriceEur: 12.30, origin: 'Mittelmeer', available: true, aiGenerated: false }
    ];
    this.categoryCount = Array.from(new Set(this.items.map(item => item.category))).length;
    this.cdr.detectChanges();
  }

  getCurrentLang(): string {
    return this.translate.currentLang || this.translate.getDefaultLang() || 'de';
  }

  productName(product: Product) {
    const lang = this.getCurrentLang();
    if (lang === 'vi') return product.nameVi || product.nameDe;
    if (lang === 'en') return product.nameEn || product.nameDe;
    return product.nameDe;
  }

  trackBySku(index: number, product: Product): string {
    return product.sku;
  }
}
