import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AdminComponent } from './features/admin/admin.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { MarketingComponent } from './features/marketing/marketing.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'marketing', component: MarketingComponent },
  { path: '**', redirectTo: '/login' }
];
