import { NgFor, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { API_BASE } from '../../core/api.config';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
  <div class="fade-in">
    <h1 class="page-title">{{ 'dashboard.title' | translate }}</h1>
    <p class="page-subtitle">{{ 'dashboard.subtitle' | translate }}</p>

    <div class="services-grid">
      <div class="service-card healthy" (click)="testCatalog()">
        <div class="service-header">
          <div class="service-icon" style="background: #dcfce7; color: #166534;">🐟</div>
          <div style="flex: 1;">
            <h3 class="service-title">{{ 'dashboard.cards.catalog.title' | translate }}</h3>
            <div class="service-status status-healthy">{{ 'dashboard.status.healthy' | translate }}</div>
          </div>
        </div>
        <p class="service-description">{{ 'dashboard.cards.catalog.description' | translate }}</p>
        <div class="service-actions">
          <button class="btn btn-primary btn-sm" (click)="searchProducts(); $event.stopPropagation()">
            {{ 'dashboard.cards.catalog.action' | translate }}
          </button>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">{{ 'dashboard.demo.title' | translate }}</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h4>{{ 'dashboard.demo.rawTitle' | translate }}</h4>
          <pre style="background: #f8fafc; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; font-size: 0.8rem;">{{selectedData | json}}</pre>
        </div>
      </div>
    </div>
  </div>
  `,
  imports: [NgFor, JsonPipe, TranslateModule]
})
export class DashboardComponent {
  selectedData: any = {};

  constructor(private http: HttpClient, private translate: TranslateService) {}

  testCatalog() {
    this.searchProducts();
  }

  searchProducts() {
    this.http.get(`${API_BASE}/catalog/products`)
      .subscribe({
        next: data => this.selectedData = data,
        error: err => {
          console.log('Search failed', err);
          this.selectedData = {
            error: this.translate.instant('dashboard.errors.apiUnavailable'),
            message: this.translate.instant('dashboard.errors.backendDown')
          };
        }
      });
  }
}
