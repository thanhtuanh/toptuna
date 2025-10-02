import { Component, OnInit, inject } from '@angular/core';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductsService, Product } from '../../core/products.service';
import { CartService } from '../../core/cart.service';
import { AssetService, ImageSize } from '../../config/sized-assets.config';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [NgIf, NgFor, DecimalPipe, RouterLink, TranslateModule]
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly translate = inject(TranslateService);
  private readonly cart = inject(CartService);

  product?: Product;
  loading = true;
  notFound = false;
  quantity = 1;

  private getFallbackImage(product: Product): string {
    if (product.imageUrl) return product.imageUrl;
    
    const category = product.category?.toLowerCase() || '';
    const name = product.nameDe?.toLowerCase() || '';
    
    // Lachs / Salmon
    if (category.includes('lachs') || name.includes('lachs') || name.includes('salmon')) {
      return 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=300&fit=crop';
    }
    
    // Thunfisch / Tuna
    if (category.includes('thunfisch') || name.includes('thunfisch') || name.includes('tuna')) {
      return 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop';
    }
    
    // Garnelen / Shrimp
    if (category.includes('garnelen') || name.includes('garnelen') || name.includes('shrimp') || name.includes('prawns')) {
      return 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop';
    }
    
    // Kabeljau / Cod
    if (category.includes('kabeljau') || name.includes('kabeljau') || name.includes('cod')) {
      return 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop';
    }
    
    // Default Fisch
    return 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop';
  }

  ngOnInit() {
    const sku = this.route.snapshot.paramMap.get('sku');
    if (!sku) {
      this.loading = false;
      this.notFound = true;
      return;
    }

    this.productsService.list(sku).subscribe({
      next: items => {
        this.product = items.find(p => p.sku === sku);
        
        if (this.product) {
          // Fallback-Bild setzen (Detail-Größe für Produktdetails)
          this.product.imageUrl = this.productsService.getFallbackImage(this.product, 'detail');
          
          // Demo: Preisstufen für Norwegischen Lachs hinzufügen
          if (sku === 'TT-SAL-FI-001') {
            this.product.priceTiers = {
              '5/6kg': 28.50,
              '6/7kg': 32.90
            };
            this.product.estimatedWeight = '20kg/karton/4 Fische';
          }
        }
        
        this.notFound = !this.product;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load product', err);
        this.loading = false;
        this.notFound = true;
      }
    });
  }

  addToCart() {
    if (!this.product) return;
    this.cart.add(this.product, this.quantity);
  }

  increase() {
    this.quantity = Math.min(this.quantity + 1, 99);
  }

  decrease() {
    this.quantity = Math.max(this.quantity - 1, 1);
  }

  getProductImage(product: Product): string {
    return this.productsService.getFallbackImage(product, 'detail');
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

  objectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }
}
