import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from './products.service';
import { UserService } from './user.service';

export interface CartItem {
  sku: string;
  name: string;
  unit: string;
  price: number;
  quantity: number;
  product: Product;
  userId: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly userService = inject(UserService);
  private readonly storageKey = 'toptuna_cart';
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(this.loadInitialItems());

  readonly items$ = this.itemsSubject.asObservable().pipe(
    map(items => this.filterItemsForCurrentUser(items))
  );
  readonly total$ = this.items$.pipe(
    map(items => items.reduce((sum, item) => sum + item.price * item.quantity, 0))
  );
  readonly itemCount$ = this.items$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  add(product: Product, quantity = 1) {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    const allItems = [...this.itemsSubject.value];
    const existing = allItems.find(item => item.sku === product.sku && item.userId === currentUser.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      allItems.push({
        sku: product.sku,
        name: product.nameDe,
        unit: product.unit,
        price: product.basePriceEur,
        quantity,
        product,
        userId: currentUser.id
      });
    }

    this.setItems(allItems);
  }

  updateQuantity(sku: string, quantity: number) {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    if (quantity <= 0) {
      this.remove(sku);
      return;
    }

    const allItems = this.itemsSubject.value.map(item =>
      item.sku === sku && item.userId === currentUser.id ? { ...item, quantity } : item
    );

    this.setItems(allItems);
  }

  remove(sku: string) {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    const allItems = this.itemsSubject.value.filter(item => 
      !(item.sku === sku && item.userId === currentUser.id)
    );
    this.setItems(allItems);
  }

  clear() {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    const allItems = this.itemsSubject.value.filter(item => item.userId !== currentUser.id);
    this.setItems(allItems);
  }

  private filterItemsForCurrentUser(items: CartItem[]): CartItem[] {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return [];
    return items.filter(item => item.userId === currentUser.id);
  }

  private setItems(items: CartItem[]) {
    this.itemsSubject.next(items);
    this.persist(items);
  }

  private loadInitialItems(): CartItem[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('Failed to load cart items from storage', error);
      return [];
    }
  }

  private persist(items: CartItem[]) {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.warn('Failed to persist cart items', error);
    }
  }
}
