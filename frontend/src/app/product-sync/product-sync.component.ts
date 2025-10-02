import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserService } from '../core/user.service';

interface Product {
  sku: string;
  nameDe: string;
  nameVi: string;
  nameEn: string;
  category: string;
  basePriceEur: number;
  origin: string;
  description?: string;
  descriptionVi?: string;
  imageUrl?: string;
  available: boolean;
  aiGenerated: boolean;
  lastSync?: string;
}

@Component({
  standalone: true,
  selector: 'app-product-sync',
  imports: [CommonModule],
  template: `
    <div class="sync-container">
      <div class="sync-header">
        <h1>🔄 Produkt Synchronisation</h1>
        <p>Verwalten Sie Produktdaten und Backups</p>
        <button (click)="goBack()" class="back-btn">← Zurück zum Dashboard</button>
      </div>

      <div *ngIf="!isAdmin" class="access-denied">
        <h2>Zugriff verweigert</h2>
        <p>Sie benötigen Admin-Rechte für diese Funktion.</p>
      </div>

      <div *ngIf="isAdmin" class="sync-content">
        <div class="products-section">
          <h2>Aktuelle Produkte ({{ products.length }})</h2>
          <div class="products-grid">
            <div *ngFor="let product of products" class="product-card">
              <div class="product-info">
                <strong>{{ product.nameDe }}</strong>
                <div class="product-details">
                  <span class="sku">{{ product.sku }}</span>
                  <span class="category">{{ product.category }}</span>
                  <span class="price">{{ product.basePriceEur | number:'1.2-2' }} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="actions-section">
          <button (click)="loadProducts()" class="btn btn-primary">
            🔄 Produkte neu laden
          </button>
          <button (click)="createManualBackup()" class="btn btn-secondary" [disabled]="creatingBackup">
            💾 {{ creatingBackup ? 'Erstelle Backup...' : 'Backup erstellen' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sync-container{max-width:var(--tt-max-width);margin:0 auto;padding:var(--tt-space-4)}
    .sync-header{text-align:center;margin-bottom:var(--tt-space-4)}
    .sync-header h1{color:var(--tt-primary);font-size:2rem;margin-bottom:var(--tt-space-1);font-weight:800}
    .sync-header p{color:var(--tt-muted);margin-bottom:var(--tt-space-2)}
    .back-btn{background:var(--tt-surface);color:var(--tt-text);border:1px solid var(--tt-border);padding:var(--tt-space-1) var(--tt-space-2);border-radius:8px;cursor:pointer;transition:all .2s ease}
    .back-btn:hover{background:var(--tt-primary);color:white}
    .access-denied{text-align:center;padding:var(--tt-space-4);background:var(--tt-surface);border-radius:var(--tt-radius)}
    .products-section{margin-bottom:var(--tt-space-4)}
    .products-section h2{color:var(--tt-text);margin-bottom:var(--tt-space-2)}
    .products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:var(--tt-space-2)}
    .product-card{background:var(--tt-bg);border:1px solid var(--tt-border);border-radius:var(--tt-radius);padding:var(--tt-space-2);box-shadow:var(--tt-shadow)}
    .product-info strong{color:var(--tt-text);display:block;margin-bottom:var(--tt-space-1)}
    .product-details{display:flex;gap:var(--tt-space-1);flex-wrap:wrap}
    .sku{background:var(--tt-surface);color:var(--tt-muted);padding:.25rem .5rem;border-radius:4px;font-size:.8rem;font-family:monospace}
    .category{background:var(--tt-primary);color:white;padding:.25rem .5rem;border-radius:4px;font-size:.8rem}
    .price{color:var(--tt-accent);font-weight:700;font-size:.9rem}
    .actions-section{display:flex;gap:var(--tt-space-2);justify-content:center}
    .btn{padding:var(--tt-space-2) var(--tt-space-3);border:1px solid transparent;border-radius:999px;font-weight:700;cursor:pointer;transition:all .2s ease}
    .btn-primary{background:var(--tt-primary);color:white}
    .btn-primary:hover{background:var(--tt-primary-700)}
    .btn-secondary{background:var(--tt-surface);color:var(--tt-text);border-color:var(--tt-border)}
    .btn-secondary:hover{background:var(--tt-primary);color:white}
    .btn:disabled{opacity:.5;cursor:not-allowed}
    @media (max-width:768px){
    .sync-container{padding:var(--tt-space-2)}
    .products-grid{grid-template-columns:1fr}
    .actions-section{flex-direction:column}
    }
  `]
})
export class ProductSyncComponent implements OnInit {
  products: Product[] = [];
  isAdmin = false;
  creatingBackup = false;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAdminRole();
    if (this.isAdmin) {
      this.loadDemoData();
      this.loadProducts();
    }
  }

  checkAdminRole() {
    const user = this.userService.getCurrentUser();
    this.isAdmin = user?.role === 'ADMIN';
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  loadProducts() {
    this.http.get<Product[]>(`${environment.apiBase}/catalog/products/all`)
      .subscribe({
        next: (products) => this.products = products,
        error: (err) => {
          console.error('API failed, using demo data', err);
          this.loadDemoData();
        }
      });
  }

  loadDemoData() {
    this.products = [
      { sku: 'TT-LAC-FR-001', nameDe: 'Atlantik Lachs Filet', nameVi: 'Phi lê cá hồi Đại Tây Dương', nameEn: 'Atlantic Salmon Fillet', category: 'Lachs', basePriceEur: 24.50, origin: 'Norwegen', available: true, aiGenerated: false },
      { sku: 'TT-THU-FR-002', nameDe: 'Gelbflossenthun Sashimi', nameVi: 'Cá ngừ vây vàng sashimi', nameEn: 'Yellowfin Tuna Sashimi', category: 'Thunfisch', basePriceEur: 45.00, origin: 'Pazifik', available: true, aiGenerated: false },
      { sku: 'TT-GAR-TK-003', nameDe: 'Tiger Garnelen 16/20', nameVi: 'Tôm hùm 16/20', nameEn: 'Tiger Prawns 16/20', category: 'Garnelen', basePriceEur: 18.75, origin: 'Vietnam', available: true, aiGenerated: false }
    ];
  }

  createManualBackup() {
    this.creatingBackup = true;
    const headers = new HttpHeaders().set('X-User-Role', 'ADMIN');
    this.http.post(`${environment.apiBase}/catalog/backup`, {}, {
      headers,
      responseType: 'text'
    }).subscribe({
      next: (response) => {
        alert('Backup erfolgreich erstellt!');
        this.creatingBackup = false;
      },
      error: (error) => {
        console.error('Error creating backup:', error);
        this.creatingBackup = false;
        alert('Demo: Backup würde erstellt werden');
      }
    });
  }
}
