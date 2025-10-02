import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf, NgClass, DecimalPipe, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductsService, Product } from '../../core/products.service';
import { CartService } from '../../core/cart.service';
import { AssetService } from '../../config/sized-assets.config';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [NgIf, NgFor, NgClass, FormsModule, DecimalPipe, RouterLink, TranslateModule, AsyncPipe]
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly translate = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory = 'all';
  searchTerm = '';
  loading = false;
  readonly cartCount$ = this.cartService.itemCount$;
  readonly highlightSku = signal<string | null>(null);

  ngOnInit() {
    this.loadDemoData();
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productsService.list().subscribe({
      next: products => {
        this.products = products;
        this.categories = Array.from(new Set(products.map(p => p.category))).sort();
        this.applyFilters();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('API failed, using demo data', err);
        this.loadDemoData();
        this.loading = false;
      }
    });
  }

  loadDemoData() {
    this.products = [
      { sku: 'TT-LAC-FR-001', nameDe: 'Atlantik Lachs Filet', nameVi: 'Phi lê cá hồi Đại Tây Dương', category: 'Lachs', unit: 'kg', basePriceEur: 24.50, origin: 'Norwegen', available: true, aiGenerated: false },
      { sku: 'TT-THU-FR-002', nameDe: 'Gelbflossenthun Sashimi', nameVi: 'Cá ngừ vây vàng sashimi', category: 'Thunfisch', unit: 'kg', basePriceEur: 45.00, origin: 'Pazifik', available: true, aiGenerated: false },
      { sku: 'TT-GAR-TK-003', nameDe: 'Tiger Garnelen 16/20', nameVi: 'Tôm hùm 16/20', category: 'Garnelen', unit: 'kg', basePriceEur: 18.75, origin: 'Vietnam', available: true, aiGenerated: false },
      { sku: 'TT-KRA-LE-004', nameDe: 'Königskrabbe Beine', nameVi: 'Chân cua hoàng gia', category: 'Krabben', unit: 'kg', basePriceEur: 65.00, origin: 'Alaska', available: true, aiGenerated: false },
      { sku: 'TT-TIN-FR-005', nameDe: 'Tintenfisch Ringe', nameVi: 'Vòng mực', category: 'Tintenfisch', unit: 'kg', basePriceEur: 12.30, origin: 'Mittelmeer', available: true, aiGenerated: false },
      { sku: 'TT-LAC-FR-006', nameDe: 'Bio Lachs Steak', nameVi: 'Bít tết cá hồi hữu cơ', category: 'Lachs', unit: 'kg', basePriceEur: 28.90, origin: 'Schottland', available: true, aiGenerated: false }
    ];
    this.categories = Array.from(new Set(this.products.map(p => p.category))).sort();
    this.applyFilters();
    this.cdr.detectChanges();
  }

  applyFilters() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredProducts = this.products.filter(product => {
      const matchesTerm = !term || (
        `${product.nameDe || ''} ${product.nameEn || ''} ${product.nameVi || ''} ${product.sku || ''} ${product.category || ''} ${product.origin || ''}`
          .toLowerCase()
          .includes(term)
      );
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      return matchesTerm && matchesCategory;
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.applyFilters();
  }

  getProductImage(product: Product): string {
    return this.productsService.getFallbackImage(product, 'thumbnail');
  }

  addToCart(product: Product) {
    this.cartService.add(product);
    this.highlightSku.set(product.sku);
    setTimeout(() => this.highlightSku.set(null), 2000);
  }

  trackBySku(_: number, product: Product) {
    return product.sku;
  }

  productName(product: Product) {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    if (lang === 'vi') {
      return product.nameVi;
    }
    if (lang === 'en') {
      return product.nameEn || product.nameDe;
    }
    return product.nameDe;
  }
}
