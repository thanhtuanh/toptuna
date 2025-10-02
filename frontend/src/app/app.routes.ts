import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AdminComponent } from './features/admin/admin.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { MarketingComponent } from './features/marketing/marketing.component';
import { ProductListComponent } from './features/shop/product-list.component';
import { ProductDetailComponent } from './features/shop/product-detail.component';
import { CartComponent } from './features/shop/cart.component';
import { ProductSyncComponent } from './product-sync/product-sync.component';

export const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'dashboard', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'sync', component: ProductSyncComponent },
  { path: 'shop', component: ProductListComponent },
  { path: 'shop/:sku', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'marketing', component: MarketingComponent },
  { path: '**', redirectTo: '/login' }
];
