import { NgFor, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { API_BASE } from '../../core/api.config';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
  <div class="fade-in">
    <h1 class="page-title">Dashboard</h1>
    <p class="page-subtitle">TopTuna B2B Portal</p>

    <div class="services-grid">
      <div class="service-card healthy" (click)="testCatalog()">
        <div class="service-header">
          <div class="service-icon" style="background: #dcfce7; color: #166534;">🐟</div>
          <div style="flex: 1;">
            <h3 class="service-title">Catalog Service</h3>
            <div class="service-status status-healthy">HEALTHY</div>
          </div>
        </div>
        <p class="service-description">Fish catalog with 30+ products</p>
        <div class="service-actions">
          <button class="btn btn-primary btn-sm" (click)="searchProducts(); $event.stopPropagation()">
            Search Products
          </button>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">Catalog Data</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h4>Raw Data</h4>
          <pre style="background: #f8fafc; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; font-size: 0.8rem;">{{selectedData | json}}</pre>
        </div>
      </div>
    </div>
  </div>
  `,
  imports: [NgFor, JsonPipe]
})
export class DashboardComponent {
  selectedData: any = {};

  constructor(private http: HttpClient) {}

  testCatalog() {
    this.searchProducts();
  }

  searchProducts() {
    this.http.get(`${API_BASE}/catalog/products`)
      .subscribe({
        next: data => this.selectedData = data,
        error: err => {
          console.log('Search failed', err);
          this.selectedData = {error: 'API not available', message: 'Backend services not running'};
        }
      });
  }
}