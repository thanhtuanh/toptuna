import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf, JsonPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
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
      <div class="details">
        <p>Users: {{authData?.length || 0}}</p>
        <small>Roles: Admin, Customer, Driver, Dispatcher</small>
      </div>
    </div>

    <div class="service-card" [class.healthy]="catalogHealth" (click)="testService('catalog')">
      <h3>Catalog Service</h3>
      <div class="status">{{catalogHealth ? 'HEALTHY' : 'DOWN'}}</div>
      <div class="details">
        <p>Products: {{catalogData?.length || 0}}</p>
        <small>Categories: Lachs, Thunfisch, Garnelen</small>
      </div>
    </div>

    <div class="service-card" [class.healthy]="ordersHealth" (click)="testService('orders')">
      <h3>Order Service</h3>
      <div class="status">{{ordersHealth ? 'HEALTHY' : 'DOWN'}}</div>
      <div class="details">
        <p>Recent Orders: {{ordersData?.length || 0}}</p>
        <small>Total Value: {{getTotalValue()}}€</small>
      </div>
    </div>

    <div class="service-card" [class.healthy]="logisticsHealth" (click)="testService('logistics')">
      <h3>Logistics Service</h3>
      <div class="status">{{logisticsHealth ? 'HEALTHY' : 'DOWN'}}</div>
      <div class="details">
        <p>Active Routes: {{logisticsData?.length || 0}}</p>
        <small>HACCP Tracking: Enabled</small>
      </div>
    </div>

    <div class="service-card" [class.healthy]="crmHealth" (click)="testService('crm')">
      <h3>CRM Service</h3>
      <div class="status">{{crmHealth ? 'HEALTHY' : 'DOWN'}}</div>
      <div class="details">
        <p>Segments: {{getCrmSegmentsCount()}}</p>
        <small>Customers: {{getTotalCustomers()}}</small>
      </div>
    </div>

    <div class="service-card" [class.healthy]="exportHealth" (click)="testService('export')">
      <h3>Export Service</h3>
      <div class="status">{{exportHealth ? 'HEALTHY' : 'DOWN'}}</div>
      <div class="details">
        <p>Daily Revenue: {{exportData?.tagesumsatz || 0}}€</p>
        <small>DATEV Export: Ready</small>
      </div>
    </div>
  </div>

  <div class="catalog-admin" *ngIf="selectedService === 'catalog'">
    <h3>Fish Catalog Management</h3>
    
    <div class="add-product">
      <h4>Add New Product</h4>
      <form (ngSubmit)="addProduct()">
        <input [(ngModel)]="newProduct.sku" placeholder="SKU" required>
        <input [(ngModel)]="newProduct.nameDe" placeholder="German Name" required>
        <input [(ngModel)]="newProduct.nameVi" placeholder="Vietnamese Name">
        <input [(ngModel)]="newProduct.category" placeholder="Category" required>
        <input [(ngModel)]="newProduct.unit" placeholder="Unit" required>
        <input [(ngModel)]="newProduct.basePriceEur" type="number" step="0.01" placeholder="Price EUR" required>
        <button type="submit">Add Product</button>
      </form>
    </div>

    <table class="catalog-table">
      <thead>
        <tr>
          <th>SKU</th><th>Name DE</th><th>Name VI</th><th>Category</th><th>Unit</th><th>Price</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let product of catalogData; trackBy: trackBySku">
          <td>{{product.sku}}</td>
          <td>
            <input *ngIf="editingProduct === product.sku; else showNameDe" 
                   [(ngModel)]="product.nameDe" (blur)="saveProduct(product)">
            <ng-template #showNameDe>{{ getCurrentLang() === 'vi' ? product.nameVi : product.nameDe }}</ng-template>
          </td>
          <td>
            <input *ngIf="editingProduct === product.sku; else showNameVi" 
                   [(ngModel)]="product.nameVi" (blur)="saveProduct(product)">
            <ng-template #showNameVi>{{product.nameVi}}</ng-template>
          </td>
          <td>
            <input *ngIf="editingProduct === product.sku; else showCategory" 
                   [(ngModel)]="product.category" (blur)="saveProduct(product)">
            <ng-template #showCategory>{{product.category}}</ng-template>
          </td>
          <td>{{product.unit}}</td>
          <td>
            <input *ngIf="editingProduct === product.sku; else showPrice" 
                   [(ngModel)]="product.basePriceEur" type="number" step="0.01" (blur)="saveProduct(product)">
            <ng-template #showPrice>{{product.basePriceEur | number:'1.2-2'}} €</ng-template>
          </td>
          <td>
            <button *ngIf="editingProduct !== product.sku" (click)="editProduct(product.sku)">Edit</button>
            <button *ngIf="editingProduct === product.sku" (click)="cancelEdit()">Cancel</button>
            <button (click)="deleteProduct(product.sku)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="demo-data" *ngIf="selectedService && selectedService !== 'catalog'">
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
    .catalog-admin { margin-top: 20px; }
    .add-product { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
    .add-product form { display: flex; gap: 10px; flex-wrap: wrap; }
    .add-product input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    .catalog-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    .catalog-table th, .catalog-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    .catalog-table th { background: #f5f5f5; }
    .catalog-table input { width: 100%; border: none; padding: 4px; }
    .delete-btn { background: #f44336; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
  `],
  imports: [NgFor, NgIf, JsonPipe, DecimalPipe, FormsModule]
})
export class AdminComponent {
  authHealth = false; catalogHealth = false; ordersHealth = false;
  logisticsHealth = false; crmHealth = false; exportHealth = false;
  
  authData: any; catalogData: any; ordersData: any;
  logisticsData: any; crmData: any; exportData: any;
  
  selectedService = '';
  selectedData: any;
  editingProduct = '';
  newProduct: any = { sku: '', nameDe: '', nameVi: '', category: '', unit: '', basePriceEur: 0 };

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.checkAllServices();
    this.loadAllData();
  }

  checkAllServices() {
    this.http.get(`${API_BASE}/auth/users`)
      .subscribe({next: () => this.authHealth = true, error: () => this.authHealth = false});
    
    this.http.get(`${API_BASE}/catalog/products`)
      .subscribe({next: () => this.catalogHealth = true, error: () => this.catalogHealth = false});
    
    this.http.get(`${API_BASE}/orders/recent`)
      .subscribe({next: () => this.ordersHealth = true, error: () => this.ordersHealth = false});
    
    this.http.get(`${API_BASE}/logistics/routes/today`)
      .subscribe({next: () => this.logisticsHealth = true, error: () => this.logisticsHealth = false});
    
    this.http.get(`${API_BASE}/crm/customers/segments`)
      .subscribe({next: () => this.crmHealth = true, error: () => this.crmHealth = false});
    
    this.http.get(`${API_BASE}/export/admin/dashboard`)
      .subscribe({next: () => this.exportHealth = true, error: () => this.exportHealth = false});
  }

  loadAllData() {
    this.http.get(`${API_BASE}/auth/users`).subscribe({
      next: data => this.authData = data,
      error: () => this.authData = null
    });
    this.http.get(`${API_BASE}/catalog/products`).subscribe({
      next: data => this.catalogData = data,
      error: () => this.catalogData = null
    });
    this.http.get(`${API_BASE}/orders/recent`).subscribe({
      next: data => this.ordersData = data,
      error: () => this.ordersData = null
    });
    this.http.get(`${API_BASE}/logistics/routes/today`).subscribe({
      next: data => this.logisticsData = data,
      error: () => this.logisticsData = null
    });
    this.http.get(`${API_BASE}/crm/customers/segments`).subscribe({
      next: data => this.crmData = data,
      error: () => this.crmData = null
    });
    this.http.get(`${API_BASE}/export/admin/dashboard`).subscribe({
      next: data => this.exportData = data,
      error: () => this.exportData = null
    });
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

  getCrmSegmentsCount(): number {
    if (!this.crmData || typeof this.crmData !== 'object') return 0;
    return Object.keys(this.crmData).length;
  }

  getTotalCustomers(): number {
    if (!this.crmData || typeof this.crmData !== 'object') return 0;
    return Object.values(this.crmData as Record<string, any[]>)
      .reduce((sum, customers) => sum + (customers?.length || 0), 0);
  }

  trackBySku(index: number, product: any): string {
    return product.sku;
  }

  editProduct(sku: string) {
    this.editingProduct = sku;
  }

  cancelEdit() {
    this.editingProduct = '';
    this.loadAllData(); // Reload to reset changes
  }

  saveProduct(product: any) {
    if (!this.validateSku(product.sku)) {
      alert('Invalid SKU format. Use: TT-XXX-XXX-XXX');
      return;
    }
    
    this.http.put(`${API_BASE}/catalog/products/${product.sku}`, product)
      .subscribe({
        next: () => {
          this.editingProduct = '';
          alert('Product updated successfully');
        },
        error: () => alert('Update failed')
      });
  }

  addProduct() {
    if (!this.validateSku(this.newProduct.sku)) {
      alert('Invalid SKU format. Use: TT-XXX-XXX-XXX');
      return;
    }

    this.http.post(`${API_BASE}/catalog/products`, this.newProduct)
      .subscribe({
        next: () => {
          this.newProduct = { sku: '', nameDe: '', nameVi: '', category: '', unit: '', basePriceEur: 0 };
          this.loadAllData();
          alert('Product added successfully');
        },
        error: () => alert('Add failed')
      });
  }

  deleteProduct(sku: string) {
    if (confirm('Delete product ' + sku + '?')) {
      this.http.delete(`${API_BASE}/catalog/products/${sku}`)
        .subscribe({
          next: () => {
            this.loadAllData();
            alert('Product deleted successfully');
          },
          error: () => alert('Delete failed')
        });
    }
  }

  validateSku(sku: string): boolean {
    return /^TT-[A-Z]{3}-[A-Z]{2,3}-\d{3}$/.test(sku);
  }

  getCurrentLang(): string {
    return this.translate.currentLang || 'de';
  }
}
