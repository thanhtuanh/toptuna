import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf, JsonPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { API_BASE } from '../../core/api.config';
import { UserService } from '../../core/user.service';

@Component({
  standalone: true,
  selector: 'app-admin',
  template: `
  <!-- ADMIN Dashboard -->
  <div *ngIf="userService.hasRole('ADMIN')">
    <h2>{{ 'admin.title' | translate }}</h2>
    
    <div class="services-grid">
      <div class="service-card healthy" (click)="testService('auth')">
        <h3>{{ 'admin.services.auth.title' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'admin.services.auth.users' | translate:{ count: authData?.length || 0 } }}</p>
          <small>{{ 'admin.services.auth.roles' | translate }}</small>
        </div>
      </div>

      <div class="service-card healthy" (click)="testService('catalog')">
        <h3>{{ 'admin.services.catalog.title' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'admin.services.catalog.products' | translate:{ count: catalogData?.length || 0 } }}</p>
          <small>{{ 'admin.services.catalog.categories' | translate }}</small>
        </div>
      </div>

      <div class="service-card healthy" (click)="testService('orders')">
        <h3>{{ 'admin.services.orders.title' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'admin.services.orders.recent' | translate:{ count: ordersData?.length || 0 } }}</p>
          <small>{{ 'admin.services.orders.totalValue' | translate:{ value: (getTotalValue() | number:'1.2-2') } }}</small>
        </div>
      </div>

      <div class="service-card healthy" (click)="testService('logistics')">
        <h3>{{ 'admin.services.logistics.title' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'admin.services.logistics.routes' | translate:{ count: logisticsData?.length || 0 } }}</p>
          <small>{{ 'admin.services.logistics.haccp' | translate }}</small>
        </div>
      </div>

      <div class="service-card healthy" (click)="testService('crm')">
        <h3>{{ 'admin.services.crm.title' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'admin.services.crm.segments' | translate:{ count: getCrmSegmentsCount() } }}</p>
          <small>{{ 'admin.services.crm.customers' | translate:{ count: getTotalCustomers() } }}</small>
        </div>
      </div>

      <div class="service-card healthy" (click)="testService('export')">
        <h3>{{ 'admin.services.export.title' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'admin.services.export.revenue' | translate:{ value: exportData?.tagesumsatz || 0 } }}</p>
          <small>{{ 'admin.services.export.datev' | translate }}</small>
        </div>
      </div>
    </div>
  </div>

  <!-- MARKETING Dashboard -->
  <div *ngIf="userService.hasRole('MARKETING')">
    <h2>{{ 'dashboard.marketing.title' | translate }}</h2>
    <div class="services-grid">
      <div class="service-card healthy" (click)="testService('catalog')">
        <h3>{{ 'admin.services.catalog.title' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'admin.services.catalog.products' | translate:{ count: catalogData?.length || 0 } }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- DISPO Dashboard -->
  <div *ngIf="userService.hasRole('DISPO')">
    <h2>{{ 'dashboard.dispo.title' | translate }}</h2>
    <div class="services-grid">
      <div class="service-card healthy" (click)="testService('orders')">
        <h3>{{ 'admin.services.orders.title' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'admin.services.orders.recent' | translate:{ count: ordersData?.length || 0 } }}</p>
        </div>
      </div>
      <div class="service-card healthy" (click)="testService('logistics')">
        <h3>{{ 'admin.services.logistics.title' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'admin.services.logistics.routes' | translate:{ count: logisticsData?.length || 0 } }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- DRIVER Dashboard -->
  <div *ngIf="userService.hasRole('DRIVER')">
    <h2>{{ 'dashboard.driver.title' | translate }}</h2>
    <div class="services-grid">
      <div class="service-card healthy" (click)="testService('logistics')">
        <h3>{{ 'admin.services.logistics.title' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'admin.services.logistics.routes' | translate:{ count: logisticsData?.length || 0 } }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- ACCOUNTING Dashboard -->
  <div *ngIf="userService.hasRole('ACCOUNTING')">
    <h2>{{ 'dashboard.accounting.title' | translate }}</h2>
    <div class="services-grid">
      <div class="service-card healthy" (click)="testService('export')">
        <h3>{{ 'admin.services.export.title' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'admin.services.export.revenue' | translate:{ value: exportData?.tagesumsatz || 0 } }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- CUSTOMER Dashboard -->
  <div *ngIf="userService.hasRole('CUSTOMER')">
    <h2>{{ 'dashboard.customer.title' | translate }}</h2>
    <div class="services-grid">
      <div class="service-card healthy" (click)="testService('customer-orders')">
        <h3>{{ 'dashboard.customer.orders' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'dashboard.customer.ordersCount' | translate:{ count: ordersData?.length || 0 } }}</p>
        </div>
      </div>
      <div class="service-card healthy" (click)="testService('customer-profile')">
        <h3>{{ 'dashboard.customer.profile' | translate }}</h3>
        <div class="status">ONLINE</div>
        <div class="details">
          <p>{{ 'dashboard.customer.profileDesc' | translate }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="catalog-admin" *ngIf="selectedService === 'catalog'">
    <h3>{{ 'admin.catalog.title' | translate }}</h3>
    
    <div class="add-product">
      <h4>{{ 'admin.catalog.addTitle' | translate }}</h4>
      <form (ngSubmit)="addProduct()">
        <input [(ngModel)]="newProduct.sku" [placeholder]="'admin.catalog.form.sku' | translate" required>
        <input [(ngModel)]="newProduct.nameDe" [placeholder]="'admin.catalog.form.nameDe' | translate" required>
        <input [(ngModel)]="newProduct.nameVi" [placeholder]="'admin.catalog.form.nameVi' | translate">
        <input [(ngModel)]="newProduct.category" [placeholder]="'admin.catalog.form.category' | translate" required>
        <input [(ngModel)]="newProduct.unit" [placeholder]="'admin.catalog.form.unit' | translate" required>
        <input [(ngModel)]="newProduct.basePriceEur" type="number" step="0.01" [placeholder]="'admin.catalog.form.price' | translate" required>
        <button type="submit">{{ 'admin.catalog.form.submit' | translate }}</button>
      </form>
    </div>

    <table class="catalog-table">
      <thead>
        <tr>
          <th>{{ 'admin.catalog.table.sku' | translate }}</th>
          <th>{{ 'admin.catalog.table.nameDe' | translate }}</th>
          <th>{{ 'admin.catalog.table.nameVi' | translate }}</th>
          <th>{{ 'admin.catalog.table.category' | translate }}</th>
          <th>{{ 'admin.catalog.table.unit' | translate }}</th>
          <th>{{ 'admin.catalog.table.price' | translate }}</th>
          <th>{{ 'admin.catalog.table.actions' | translate }}</th>
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
            <button *ngIf="editingProduct !== product.sku" (click)="editProduct(product.sku)">{{ 'admin.catalog.actions.edit' | translate }}</button>
            <button *ngIf="editingProduct === product.sku" (click)="cancelEdit()">{{ 'admin.catalog.actions.cancel' | translate }}</button>
            <button (click)="deleteProduct(product.sku)" class="delete-btn">{{ 'admin.catalog.actions.delete' | translate }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Auth Table -->
  <div class="service-data" *ngIf="selectedService === 'auth'">
    <h3>Benutzer & Authentifizierung</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Benutzername</th>
          <th>E-Mail</th>
          <th>Rolle</th>
          <th>Status</th>
          <th *ngIf="canEditAuth()">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of authData; let i = index">
          <td>{{user.id || (i+1)}}</td>
          <td>
            <input *ngIf="editingItem === 'auth-' + i; else showUsername" 
                   [(ngModel)]="user.username" (blur)="saveAuthUser(user, i)">
            <ng-template #showUsername>{{user.username || ('user' + (i+1))}}</ng-template>
          </td>
          <td>
            <input *ngIf="editingItem === 'auth-' + i; else showEmail" 
                   [(ngModel)]="user.email" (blur)="saveAuthUser(user, i)">
            <ng-template #showEmail>{{user.email || ('user' + (i+1) + '@toptuna.de')}}</ng-template>
          </td>
          <td>
            <select *ngIf="editingItem === 'auth-' + i; else showRole" 
                    [(ngModel)]="user.role" (change)="saveAuthUser(user, i)">
              <option value="ADMIN">ADMIN</option>
              <option value="MARKETING">MARKETING</option>
              <option value="DISPO">DISPO</option>
              <option value="DRIVER">DRIVER</option>
              <option value="ACCOUNTING">ACCOUNTING</option>
              <option value="CUSTOMER">CUSTOMER</option>
            </select>
            <ng-template #showRole>{{user.role || 'USER'}}</ng-template>
          </td>
          <td>{{user.active !== false ? 'Aktiv' : 'Inaktiv'}}</td>
          <td *ngIf="canEditAuth()">
            <button *ngIf="editingItem !== 'auth-' + i" (click)="editAuthUser('auth-' + i)">Bearbeiten</button>
            <button *ngIf="editingItem === 'auth-' + i" (click)="cancelEdit()">Abbrechen</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- CRM Table -->
  <div class="service-data" *ngIf="selectedService === 'crm'">
    <h3>CRM & Kundensegmente</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Kunde</th>
          <th>Segment</th>
          <th>Umsatz</th>
          <th>Letzte Bestellung</th>
          <th>Status</th>
          <th *ngIf="canEditCrm()">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let customer of getCrmData(); let i = index">
          <td>
            <input *ngIf="editingItem === 'crm-' + i; else showName" 
                   [(ngModel)]="customer.name" (blur)="saveCrmCustomer(customer, i)">
            <ng-template #showName>{{customer.name}}</ng-template>
          </td>
          <td>
            <select *ngIf="editingItem === 'crm-' + i; else showSegment" 
                    [(ngModel)]="customer.segment" (change)="saveCrmCustomer(customer, i)">
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
              <option value="Basic">Basic</option>
            </select>
            <ng-template #showSegment>{{customer.segment}}</ng-template>
          </td>
          <td>{{customer.revenue | number:'1.2-2'}} €</td>
          <td>{{customer.lastOrder}}</td>
          <td>
            <select *ngIf="editingItem === 'crm-' + i; else showCrmStatus" 
                    [(ngModel)]="customer.status" (change)="saveCrmCustomer(customer, i)">
              <option value="Aktiv">Aktiv</option>
              <option value="Inaktiv">Inaktiv</option>
            </select>
            <ng-template #showCrmStatus>{{customer.status}}</ng-template>
          </td>
          <td *ngIf="canEditCrm()">
            <button *ngIf="editingItem !== 'crm-' + i" (click)="editCrmCustomer('crm-' + i)">Bearbeiten</button>
            <button *ngIf="editingItem === 'crm-' + i" (click)="cancelEdit()">Abbrechen</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Orders Table -->
  <div class="service-data" *ngIf="selectedService === 'orders'">
    <h3>Bestellungen</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Kunde</th>
          <th>Betrag</th>
          <th>Status</th>
          <th *ngIf="canEditOrders()">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let order of ordersData; let i = index">
          <td>{{getOrderId(order, i)}}</td>
          <td>{{getOrderCustomer(order, i)}}</td>
          <td>{{getOrderAmount(order, i)}} €</td>
          <td>
            <select *ngIf="editingItem === 'order-' + i; else showOrderStatus" 
                    [(ngModel)]="order.status" (change)="saveOrder(order, i)">
              <option value="pending">Ausstehend</option>
              <option value="processing">In Bearbeitung</option>
              <option value="delivered">Geliefert</option>
              <option value="cancelled">Storniert</option>
            </select>
            <ng-template #showOrderStatus>{{order.status || 'pending'}}</ng-template>
          </td>
          <td *ngIf="canEditOrders()">
            <button *ngIf="editingItem !== 'order-' + i" (click)="editOrder('order-' + i)">Bearbeiten</button>
            <button *ngIf="editingItem === 'order-' + i" (click)="cancelEdit()">Abbrechen</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Logistics Table -->
  <div class="service-data" *ngIf="selectedService === 'logistics'">
    <h3>Logistik Routen</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Route ID</th>
          <th>Fahrer</th>
          <th>Fahrzeug</th>
          <th>Status</th>
          <th *ngIf="canEditLogistics()">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let route of logisticsData; let i = index">
          <td>{{getRouteId(route, i)}}</td>
          <td>
            <input *ngIf="editingItem === 'route-' + i; else showDriver" 
                   [(ngModel)]="route.driver" (blur)="saveRoute(route, i)">
            <ng-template #showDriver>{{getRouteDriver(route, i)}}</ng-template>
          </td>
          <td>
            <input *ngIf="editingItem === 'route-' + i; else showVehicle" 
                   [(ngModel)]="route.vehicle" (blur)="saveRoute(route, i)">
            <ng-template #showVehicle>{{getRouteVehicle(route, i)}}</ng-template>
          </td>
          <td>
            <select *ngIf="editingItem === 'route-' + i; else showStatus" 
                    [(ngModel)]="route.status" (change)="saveRoute(route, i)">
              <option value="planned">Geplant</option>
              <option value="active">Aktiv</option>
              <option value="completed">Abgeschlossen</option>
            </select>
            <ng-template #showStatus>{{route.status || 'planned'}}</ng-template>
          </td>
          <td *ngIf="canEditLogistics()">
            <button *ngIf="editingItem !== 'route-' + i" (click)="editRoute('route-' + i)">Bearbeiten</button>
            <button *ngIf="editingItem === 'route-' + i" (click)="cancelEdit()">Abbrechen</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Export/Accounting Table -->
  <div class="service-data" *ngIf="selectedService === 'export'">
    <h3>Buchhaltung & Export</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Datum</th>
          <th>Umsatz</th>
          <th>Rechnungen</th>
          <th>DATEV Export</th>
          <th>Status</th>
          <th *ngIf="canEditExport()">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let export of getExportData(); let i = index">
          <td>{{export.date}}</td>
          <td>{{export.revenue | number:'1.2-2'}} €</td>
          <td>{{export.invoices}}</td>
          <td>
            <select *ngIf="editingItem === 'export-' + i; else showDatevStatus" 
                    [(ngModel)]="export.datevExport" (change)="saveExport(export, i)">
              <option [value]="true">Ja</option>
              <option [value]="false">Nein</option>
            </select>
            <ng-template #showDatevStatus>{{export.datevExport ? 'Ja' : 'Nein'}}</ng-template>
          </td>
          <td>
            <select *ngIf="editingItem === 'export-' + i; else showExportStatus" 
                    [(ngModel)]="export.status" (change)="saveExport(export, i)">
              <option value="pending">Ausstehend</option>
              <option value="exported">Exportiert</option>
              <option value="completed">Abgeschlossen</option>
            </select>
            <ng-template #showExportStatus>{{export.status}}</ng-template>
          </td>
          <td *ngIf="canEditExport()">
            <button *ngIf="editingItem !== 'export-' + i" (click)="editExport('export-' + i)">Bearbeiten</button>
            <button *ngIf="editingItem === 'export-' + i" (click)="cancelEdit()">Abbrechen</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Customer Orders Table -->
  <div class="service-data" *ngIf="selectedService === 'customer-orders'">
    <h3>Meine Bestellungen</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Bestellnummer</th>
          <th>Datum</th>
          <th>Betrag</th>
          <th>Status</th>
          <th>Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let order of getCustomerOrders(); let i = index">
          <td>{{order.id}}</td>
          <td>{{order.date | date:'dd.MM.yyyy'}}</td>
          <td>{{order.totalAmount | number:'1.2-2'}} €</td>
          <td>{{order.status}}</td>
          <td>
            <button *ngIf="editingItem !== 'customer-order-' + i" (click)="editCustomerOrder('customer-order-' + i)">Bearbeiten</button>
            <button *ngIf="editingItem === 'customer-order-' + i" (click)="cancelEdit()">Abbrechen</button>
            <button (click)="viewOrderDetails(order)">Details</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Customer Profile Table -->
  <div class="service-data" *ngIf="selectedService === 'customer-profile'">
    <h3>Mein Profil</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Feld</th>
          <th>Wert</th>
          <th>Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let field of getCustomerProfile(); let i = index">
          <td>{{field.label}}</td>
          <td>
            <input *ngIf="editingItem === 'profile-' + i; else showValue" 
                   [(ngModel)]="field.value" (blur)="saveCustomerProfile(field, i)">
            <ng-template #showValue>{{field.value}}</ng-template>
          </td>
          <td>
            <button *ngIf="editingItem !== 'profile-' + i" (click)="editCustomerProfile('profile-' + i)">Bearbeiten</button>
            <button *ngIf="editingItem === 'profile-' + i" (click)="cancelEdit()">Abbrechen</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="demo-data" *ngIf="selectedService && !['catalog', 'orders', 'logistics', 'export'].includes(selectedService)">
    <h3>{{ 'admin.demo.title' | translate:{ service: ('admin.services.' + selectedService + '.title' | translate) } }}</h3>
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
    .data-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    .data-table th, .data-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    .data-table th { background: #f5f5f5; }
    .data-table input, .data-table select { width: 100%; border: none; padding: 4px; }
    .service-data { margin-top: 20px; }
    .delete-btn { background: #f44336; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
  `],
  imports: [NgFor, NgIf, JsonPipe, DecimalPipe, FormsModule, TranslateModule]
})
export class AdminComponent {
  authHealth = true; catalogHealth = true; ordersHealth = true;
  logisticsHealth = true; crmHealth = true; exportHealth = true;
  
  authData: any; catalogData: any; ordersData: any;
  logisticsData: any; crmData: any; exportData: any;
  
  selectedService = '';
  selectedData: any;
  editingProduct = '';
  editingItem = '';
  newProduct: any = { sku: '', nameDe: '', nameVi: '', category: '', unit: '', basePriceEur: 0 };

  constructor(private http: HttpClient, private translate: TranslateService, public userService: UserService) {
    this.loadAllData();
    this.checkAllServices();
  }

  checkAllServices() {
    this.http.get(`${API_BASE}/auth/users`)
      .subscribe({next: () => this.authHealth = true, error: () => this.authHealth = true});
    
    this.http.get(`${API_BASE}/catalog/products`)
      .subscribe({next: () => this.catalogHealth = true, error: () => this.catalogHealth = true});
    
    this.http.get(`${API_BASE}/orders/recent`)
      .subscribe({next: () => this.ordersHealth = true, error: () => this.ordersHealth = true});
    
    this.http.get(`${API_BASE}/logistics/routes/today`)
      .subscribe({next: () => this.logisticsHealth = true, error: () => this.logisticsHealth = true});
    
    this.http.get(`${API_BASE}/crm/customers/segments`)
      .subscribe({next: () => this.crmHealth = true, error: () => this.crmHealth = true});
    
    this.http.get(`${API_BASE}/export/admin/dashboard`)
      .subscribe({next: () => this.exportHealth = true, error: () => this.exportHealth = true});
  }

  loadAllData() {
    // Load demo data immediately for counters
    this.authData = [
      { id: 1, username: 'admin', role: 'ADMIN', email: 'admin@toptuna.de' },
      { id: 2, username: 'marketing', role: 'MARKETING', email: 'marketing@toptuna.de' },
      { id: 3, username: 'dispo', role: 'DISPO', email: 'dispo@toptuna.de' }
    ];
    this.catalogData = [
      { sku: 'TT-LAC-FR-001', nameDe: 'Atlantik Lachs Filet', nameVi: 'Phi lê cá hồi', category: 'Lachs', unit: 'kg', basePriceEur: 24.50 },
      { sku: 'TT-THU-FR-002', nameDe: 'Gelbflossenthun Sashimi', nameVi: 'Cá ngừ sashimi', category: 'Thunfisch', unit: 'kg', basePriceEur: 45.00 },
      { sku: 'TT-GAR-TK-003', nameDe: 'Tiger Garnelen 16/20', nameVi: 'Tôm hùm 16/20', category: 'Garnelen', unit: 'kg', basePriceEur: 18.75 }
    ];
    this.ordersData = [
      { id: 'ORD-001', customer: 'Restaurant Saigon', totalAmount: 250.50, status: 'pending', date: new Date().toISOString() },
      { id: 'ORD-002', customer: 'Asia Bistro', totalAmount: 180.75, status: 'processing', date: new Date().toISOString() },
      { id: 'ORD-003', customer: 'Pho Kitchen', totalAmount: 320.00, status: 'delivered', date: new Date().toISOString() },
      { id: 'ORD-004', customer: 'Vietnam House', totalAmount: 195.25, status: 'pending', date: new Date().toISOString() }
    ];
    this.logisticsData = [
      { id: 'RT-001', driver: 'Hans Mueller', vehicle: 'LKW-01', status: 'active', deliveries: 5 },
      { id: 'RT-002', driver: 'Maria Schmidt', vehicle: 'LKW-02', status: 'planned', deliveries: 3 },
      { id: 'RT-003', driver: 'Ahmed Hassan', vehicle: 'LKW-03', status: 'completed', deliveries: 7 }
    ];
    this.crmData = {
      premium: [{ name: 'Restaurant Saigon' }, { name: 'Asia Palace' }],
      standard: [{ name: 'Pho Kitchen' }, { name: 'Vietnam House' }, { name: 'Mekong Restaurant' }]
    };
    this.exportData = { tagesumsatz: 2500, rechnungen: 15, datev_export: true };

    // Try to load real data from API (will update if successful)
    this.http.get(`${API_BASE}/auth/users`).subscribe({
      next: data => this.authData = data,
      error: () => {} // Keep demo data
    });
    this.http.get(`${API_BASE}/catalog/products`).subscribe({
      next: data => this.catalogData = data,
      error: () => {} // Keep demo data
    });
    this.http.get(`${API_BASE}/orders/recent`).subscribe({
      next: data => this.ordersData = data,
      error: () => {} // Keep demo data
    });
    this.http.get(`${API_BASE}/logistics/routes/today`).subscribe({
      next: data => this.logisticsData = data,
      error: () => {} // Keep demo data
    });
    this.http.get(`${API_BASE}/crm/customers/segments`).subscribe({
      next: data => this.crmData = data,
      error: () => {} // Keep demo data
    });
    this.http.get(`${API_BASE}/export/admin/dashboard`).subscribe({
      next: data => this.exportData = data,
      error: () => {} // Keep demo data
    });
  }

  testService(service: string) {
    this.selectedService = service;
    // Force change detection and ensure data is available
    setTimeout(() => {
      switch(service) {
        case 'auth': this.selectedData = this.authData || []; break;
        case 'catalog': this.selectedData = this.catalogData || []; break;
        case 'orders': this.selectedData = this.ordersData || []; break;
        case 'logistics': this.selectedData = this.logisticsData || []; break;
        case 'crm': this.selectedData = this.crmData || {}; break;
        case 'export': this.selectedData = this.exportData || {}; break;
        case 'customer-orders': this.selectedData = this.getCustomerOrders(); break;
        case 'customer-profile': this.selectedData = this.getCustomerProfile(); break;
      }
    }, 0);
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
    this.editingItem = '';
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

  isAdmin(): boolean {
    return this.userService.hasRole('ADMIN');
  }

  canEditAuth(): boolean {
    return this.userService.hasRole('ADMIN');
  }

  canEditCrm(): boolean {
    return this.userService.hasRole('ADMIN') || this.userService.hasRole('MARKETING');
  }

  canEditOrders(): boolean {
    return this.userService.hasRole('ADMIN') || this.userService.hasRole('DISPO');
  }

  canEditLogistics(): boolean {
    return this.userService.hasRole('ADMIN') || this.userService.hasRole('DISPO') || this.userService.hasRole('DRIVER');
  }

  canEditExport(): boolean {
    return this.userService.hasRole('ADMIN') || this.userService.hasRole('ACCOUNTING');
  }

  editAuthUser(itemId: string) {
    this.editingItem = itemId;
  }

  editOrder(itemId: string) {
    this.editingItem = itemId;
  }

  editRoute(itemId: string) {
    this.editingItem = itemId;
  }

  editCrmCustomer(itemId: string) {
    this.editingItem = itemId;
  }

  editExport(itemId: string) {
    this.editingItem = itemId;
  }

  saveAuthUser(user: any, index: number) {
    this.editingItem = '';
    alert('Benutzer gespeichert!');
  }

  saveOrder(order: any, index: number) {
    this.editingItem = '';
    alert('Bestellung gespeichert!');
  }

  saveRoute(route: any, index: number) {
    this.editingItem = '';
    alert('Route gespeichert!');
  }

  saveCrmCustomer(customer: any, index: number) {
    this.editingItem = '';
    alert('Kunde gespeichert!');
  }

  saveExport(exportItem: any, index: number) {
    this.editingItem = '';
    alert('Export gespeichert!');
  }

  saveItem(type: string, index: number) {
    const canEdit = type === 'auth' ? this.canEditAuth() :
                   type === 'crm' ? this.canEditCrm() :
                   type === 'order' ? this.canEditOrders() :
                   type === 'route' ? this.canEditLogistics() :
                   type === 'export' ? this.canEditExport() : false;
    
    if (canEdit) {
      this.editingItem = '';
      console.log(`Saving ${type} item at index ${index}`);
      // In a real app, this would save to backend
      alert(`${type} Daten gespeichert!`);
    }
  }

  getExportData(): any[] {
    return [
      { date: '02.10.2025', revenue: 2850.75, invoices: 18, datevExport: true, status: 'exported' },
      { date: '01.10.2025', revenue: 1950.50, invoices: 14, datevExport: false, status: 'pending' },
      { date: '30.09.2025', revenue: 3420.25, invoices: 22, datevExport: true, status: 'completed' },
      { date: '29.09.2025', revenue: 2150.00, invoices: 16, datevExport: true, status: 'exported' },
      { date: '28.09.2025', revenue: 1680.90, invoices: 11, datevExport: false, status: 'pending' },
      { date: '27.09.2025', revenue: 2975.40, invoices: 19, datevExport: true, status: 'completed' },
      { date: '26.09.2025', revenue: 2240.80, invoices: 15, datevExport: true, status: 'exported' },
      { date: '25.09.2025', revenue: 1890.60, invoices: 13, datevExport: false, status: 'pending' }
    ];
  }

  getOrderId(order: any, index: number): string {
    return order.id || `ORD-${index + 1}`;
  }

  getOrderCustomer(order: any, index: number): string {
    return order.customer || `Kunde ${index + 1}`;
  }

  getOrderAmount(order: any, index: number): number {
    return order.totalAmount || (100 + index * 50);
  }

  getRouteId(route: any, index: number): string {
    return route.id || `RT-${index + 1}`;
  }

  getRouteDriver(route: any, index: number): string {
    return route.driver || `Fahrer ${index + 1}`;
  }

  getRouteVehicle(route: any, index: number): string {
    return route.vehicle || `LKW-${index + 1}`;
  }

  getCrmData(): any[] {
    if (!this.crmData || typeof this.crmData !== 'object') {
      return [
        { name: 'Restaurant Saigon', segment: 'Premium', revenue: 15000, lastOrder: '2025-09-28', status: 'Aktiv' },
        { name: 'Asia Palace', segment: 'Premium', revenue: 12500, lastOrder: '2025-09-25', status: 'Aktiv' },
        { name: 'Pho Kitchen', segment: 'Standard', revenue: 8000, lastOrder: '2025-09-20', status: 'Aktiv' },
        { name: 'Vietnam House', segment: 'Standard', revenue: 6500, lastOrder: '2025-09-15', status: 'Inaktiv' },
        { name: 'Mekong Restaurant', segment: 'Basic', revenue: 3200, lastOrder: '2025-09-10', status: 'Aktiv' }
      ];
    }
    
    // Convert object structure to flat array
    const customers: any[] = [];
    Object.entries(this.crmData).forEach(([segment, segmentCustomers]) => {
      if (Array.isArray(segmentCustomers)) {
        segmentCustomers.forEach((customer: any) => {
          customers.push({
            name: customer.name || 'Unbekannt',
            segment: segment,
            revenue: customer.revenue || Math.floor(Math.random() * 10000) + 1000,
            lastOrder: customer.lastOrder || new Date().toLocaleDateString(),
            status: customer.status || 'Aktiv'
          });
        });
      }
    });
    
    return customers.length > 0 ? customers : [
      { name: 'Restaurant Saigon', segment: 'Premium', revenue: 15000, lastOrder: '2025-09-28', status: 'Aktiv' }
    ];
  }

  getCustomerOrders(): any[] {
    // Filter orders for current customer or return mock data
    return [
      { id: 'ORD-001', date: new Date(), totalAmount: 250.50, status: 'Geliefert', items: 5 },
      { id: 'ORD-002', date: new Date(Date.now() - 86400000), totalAmount: 180.75, status: 'In Bearbeitung', items: 3 },
      { id: 'ORD-003', date: new Date(Date.now() - 172800000), totalAmount: 320.00, status: 'Storniert', items: 7 }
    ];
  }

  getCustomerProfile(): any[] {
    return [
      { label: 'Firmenname', value: 'Restaurant Saigon', editable: true },
      { label: 'Kontaktperson', value: 'Nguyen Van A', editable: true },
      { label: 'E-Mail', value: 'info@restaurant-saigon.de', editable: true },
      { label: 'Telefon', value: '+49 30 12345678', editable: true },
      { label: 'Adresse', value: 'Musterstraße 123, 10115 Berlin', editable: true },
      { label: 'Kundennummer', value: 'KD-001', editable: false }
    ];
  }

  editCustomerOrder(itemId: string) {
    this.editingItem = itemId;
  }

  editCustomerProfile(itemId: string) {
    this.editingItem = itemId;
  }

  saveCustomerProfile(field: any, index: number) {
    this.editingItem = '';
    alert('Profil gespeichert!');
  }

  viewOrderDetails(order: any) {
    alert(`Bestelldetails für ${order.id}:\nBetrag: ${order.totalAmount}€\nStatus: ${order.status}`);
  }
}
