import { Component, inject } from '@angular/core';
import { NgIf, NgFor, DecimalPipe, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartService, CartItem } from '../../core/cart.service';
import { UserService, User } from '../../core/user.service';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [NgIf, NgFor, DecimalPipe, RouterLink, TranslateModule, AsyncPipe]
})
export class CartComponent {
  private readonly cart = inject(CartService);
  private readonly translate = inject(TranslateService);
  private readonly userService = inject(UserService);

  readonly items$ = this.cart.items$;
  readonly total$ = this.cart.total$;
  readonly currentUser: User | null = this.userService.getCurrentUser();

  trackBySku(_: number, item: CartItem) {
    return item.sku;
  }

  increase(item: CartItem) {
    this.cart.updateQuantity(item.sku, item.quantity + 1);
  }

  decrease(item: CartItem) {
    this.cart.updateQuantity(item.sku, item.quantity - 1);
  }

  remove(item: CartItem) {
    this.cart.remove(item.sku);
  }

  clear() {
    this.cart.clear();
  }

  productName(item: CartItem) {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    if (lang === 'vi') {
      return item.product.nameVi || item.product.nameDe;
    }
    if (lang === 'en') {
      return item.product.nameEn || item.product.nameDe;
    }
    return item.product.nameDe;
  }
}
