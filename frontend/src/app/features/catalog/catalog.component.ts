import { Component } from '@angular/core';
import { ProductsService, Product } from '../../core/products.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-catalog',
  template: `
  <h3>{{ 'catalog.title' | translate }}</h3>
  <input placeholder="{{ 'catalog.search' | translate }}" (input)="q=$any($event.target).value; load()">
  <table *ngIf="items?.length">
    <thead>
      <tr>
        <th>SKU</th><th>{{ 'catalog.name'|translate }}</th>
        <th>{{ 'catalog.category'|translate }}</th>
        <th>{{ 'catalog.price'|translate }}</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let p of items">
        <td>{{p.sku}}</td>
        <td>{{ showVN ? p.nameVi : p.nameDe }}</td>
        <td>{{p.category}}</td>
        <td>{{p.basePriceEur | number:'1.2-2'}} € / {{p.unit}}</td>
      </tr>
    </tbody>
  </table>
  <p *ngIf="!items?.length">{{ 'catalog.empty' | translate }}</p>

  <label><input type="checkbox" [(ngModel)]="showVN"> VI</label>
  `,
  imports: [TranslateModule, NgFor, NgIf, FormsModule, DecimalPipe]
})
export class CatalogComponent {
  items: Product[] = [];
  q = ''; showVN = true;
  constructor(private api: ProductsService){ this.load(); }
  load(){ this.api.list(this.q).subscribe(res => this.items = res); }
}
