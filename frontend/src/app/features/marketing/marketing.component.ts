import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';
import { API_BASE } from '../../core/api.config';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-marketing',
  template: `
  <h3>{{ 'marketing.insights' | translate }}</h3>
  
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin:16px 0">
    <div class="stat-card">
      <h4>Kunden gesamt</h4>
      <span class="big-number">{{insights?.totalCustomers}}</span>
    </div>
    <div class="stat-card">
      <h4>Vietnamesische Restaurants</h4>
      <span class="big-number">{{insights?.vietnameseCustomers}}</span>
    </div>
    <div class="stat-card">
      <h4>Ø Bestellwert</h4>
      <span class="big-number">{{insights?.avgOrderValue}}€</span>
    </div>
    <div class="stat-card">
      <h4>Monatswachstum</h4>
      <span class="big-number growth">{{insights?.monthlyGrowth}}</span>
    </div>
  </div>

  <h4>Regionale Verteilung</h4>
  <div *ngFor="let region of getRegions()" class="region-card">
    <strong>{{region.name}}</strong>
    <span>{{region.customers}} Kunden</span>
    <span class="growth">{{region.growth}}</span>
  </div>

  <h4>{{ 'marketing.recommendations' | translate }}</h4>
  <div *ngFor="let rec of recommendations" class="recommendation">
    <strong>{{rec.productSku}}</strong>
    <p>{{rec.targetMessage}}</p>
    <small>Confidence: {{rec.confidence * 100}}%</small>
  </div>
  `,
  styles: [`
    .stat-card { border:1px solid #ddd; padding:16px; border-radius:8px; text-align:center }
    .big-number { font-size:24px; font-weight:bold; color:#2196f3 }
    .growth { color:#4caf50; font-weight:bold }
    .region-card { display:flex; gap:16px; padding:8px; border-bottom:1px solid #eee }
    .recommendation { border:1px solid #ddd; padding:12px; margin:8px 0; border-radius:4px }
  `],
  imports: [TranslateModule, NgFor, NgIf]
})
export class MarketingComponent implements OnInit, OnDestroy {
  insights: any = {};
  recommendations: any[] = [];
  private subscription = new Subscription();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.subscription.add(
      this.http.get(`${API_BASE}/marketing/insights`).subscribe(data => this.insights = data)
    );
    this.subscription.add(
      this.http.get(`${API_BASE}/marketing/recommendations/customer/rest_001`)
        .subscribe((data: any) => this.recommendations = data)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getRegions() {
    if (!this.insights?.regions) return [];
    return Object.entries(this.insights.regions).map(([name, data]: [string, any]) => ({
      name, customers: data.customers, growth: data.growth
    }));
  }
}
