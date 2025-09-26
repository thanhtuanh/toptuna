import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';
import { API_BASE } from '../../core/api.config';

@Component({
  standalone: true,
  selector: 'app-admin',
  template: `
  <h2>TopTuna Admin Dashboard</h2>
  
  <div class="services-grid">
    <div class="service-card" [class.healthy]="authHealth" (click)="testService('auth')">
      <h3>Auth Service</h3>
      <div class="status">{{authHealth ? 'HEALTHY' : 'DOWN'}}</div>
      <div class="details" *ngIf="authData">
        <p>Users: {{authData.length}}</p>
        <small>Roles: Admin, Customer, Driver, Dispatcher</small>
      </div>
    </div>

    <div class="service-card" [class.healthy]="catalogHealth" (click)="testService('catalog')">
      <h3>Catalog Service</h3>
      <div class="status">{{catalogHealth ? 'HEALTHY' : 'DOWN'}}</div>
      <div class="details" *ngIf="catalogData">
        <p>Products: {{catalogData.length}}</p>
        <small>Categories: Lachs, Thunfisch, Garnelen</small>
      </div>
    </div>

    <div class="service-card" [class.healthy]="ordersHealth" (click)="testService('orders')">
      <h3>Order Service</h3>
      <div class="status">{{ordersHealth ? 'HEALTHY' : 'DOWN'}}</div>
      <div class="details" *ngIf="ordersData">
        <p>Recent Orders: {{ordersData.length}}</p>
        <small>Total Value: {{getTotalValue()}}€</small>
      </div>
    </div>

    <div class="service-card" [class.healthy]="logisticsHealth" (click)="testService('logistics')">
      <h3>Logistics Service</h3>
      <div class="status">{{logisticsHealth ? 'HEALTHY' : 'DOWN'}}</div>
      <div class="details" *ngIf="logisticsData">
        <p>Active Routes: {{logisticsData.length}}</p>
        <small>HACCP Tracking: Enabled</small>
      </div>
    </div>

    <div class="service-card" [class.healthy]="crmHealth" (click)="testService('crm')">
      <h3>CRM Service</h3>
      <div class="status">{{crmHealth ? 'HEALTHY' : 'DOWN'}}</div>
      <div class="details" *ngIf="crmData">
        <p>Segments: {{Object.keys(crmData).length}}</p>
        <small>Customers: {{getTotalCustomers()}}</small>
      </div>
    </div>

    <div class="service-card" [class.healthy]="exportHealth" (click)="testService('export')">
      <h3>Export Service</h3>
      <div class="status">{{exportHealth ? 'HEALTHY' : 'DOWN'}}</div>
      <div class="details" *ngIf="exportData">
        <p>Daily Revenue: {{exportData.tagesumsatz}}€</p>
        <small>DATEV Export: Ready</small>
      </div>
    </div>
  </div>

  <div class="demo-data" *ngIf="selectedService">
    <h3>{{selectedService}} Demo Data</h3>
    <pre>{{selectedData | json}}</pre>
  </div>
  `,
  styles: [`
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin: 20px 0; }
    .service-card { border: 2px solid #ddd; padding: 20px; border-radius: 8px; cursor: pointer; transition: all 0.3s; }
    .service-card.healthy { border-color: #4caf50; background: #f8fff8; }
    .service-card:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    .status { font-weight: bold; font-size: 18px; margin: 10px 0; }
    .service-card.healthy .status { color: #4caf50; }
    .service-card:not(.healthy) .status { color: #f44336; }
    .details { margin-top: 10px; }
    .demo-data { margin-top: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px; }
    pre { background: white; padding: 15px; border-radius: 4px; overflow-x: auto; }
  `],
  imports: [TranslateModule, NgFor, NgIf]
})
export class AdminComponent implements OnInit {
  authHealth = false; catalogHealth = false; ordersHealth = false;
  logisticsHealth = false; crmHealth = false; exportHealth = false;
  
  authData: any; catalogData: any; ordersData: any;
  logisticsData: any; crmData: any; exportData: any;
  
  selectedService = '';
  selectedData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkAllServices();
    this.loadAllData();
  }

  checkAllServices() {
    this.http.get(`${API_BASE}/auth/health`, {responseType: 'text'})
      .subscribe({next: () => this.authHealth = true, error: () => this.authHealth = false});
    
    this.http.get(`${API_BASE}/catalog/health`, {responseType: 'text'})
      .subscribe({next: () => this.catalogHealth = true, error: () => this.catalogHealth = false});
    
    this.http.get(`${API_BASE}/orders/health`, {responseType: 'text'})
      .subscribe({next: () => this.ordersHealth = true, error: () => this.ordersHealth = false});
    
    this.http.get(`${API_BASE}/logistics/health`, {responseType: 'text'})
      .subscribe({next: () => this.logisticsHealth = true, error: () => this.logisticsHealth = false});
    
    this.http.get(`${API_BASE}/crm/health`, {responseType: 'text'})
      .subscribe({next: () => this.crmHealth = true, error: () => this.crmHealth = false});
    
    this.http.get(`${API_BASE}/export/health`, {responseType: 'text'})
      .subscribe({next: () => this.exportHealth = true, error: () => this.exportHealth = false});
  }

  loadAllData() {
    this.http.get(`${API_BASE}/auth/users`).subscribe(data => this.authData = data);
    this.http.get(`${API_BASE}/catalog/products`).subscribe(data => this.catalogData = data);
    this.http.get(`${API_BASE}/orders/recent`).subscribe(data => this.ordersData = data);
    this.http.get(`${API_BASE}/logistics/routes/today`).subscribe(data => this.logisticsData = data);
    this.http.get(`${API_BASE}/crm/customers/segments`).subscribe(data => this.crmData = data);
    this.http.get(`${API_BASE}/export/admin/dashboard`).subscribe(data => this.exportData = data);
  }

  testService(service: string) {
    this.selectedService = service;
    switch(service) {
      case 'auth': this.selectedData = this.authData; break;
      case 'catalog': this.selectedData = this.catalogData; break;
      case 'orders': this.selectedData = this.ordersData; break;
      case 'logistics': this.selectedData = this.logisticsData; break;
      case 'crm': this.selectedData = this.crmData; break;
      case 'export': this.selectedData = this.exportData; break;
    }
  }

  getTotalValue(): number {
    return this.ordersData?.reduce((sum: number, order: any) => sum + order.totalAmount, 0) || 0;
  }

  getTotalCustomers(): number {
    if (!this.crmData) return 0;
    return Object.values(this.crmData).reduce((sum: number, customers: any) => sum + customers.length, 0);
  }
}
