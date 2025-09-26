import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HealthService } from '../../core/health.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-tiles',
  template: `
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">
    <div class="tile" [class.ok]="authOk" (click)="open('catalog')">
      <h4>{{ 'svc.auth' | translate }}</h4>
      <span>{{ authOk ? ('ui.ok'|translate) : ('ui.off'|translate) }}</span>
    </div>
    <div class="tile" [class.ok]="catalogOk" (click)="open('catalog')">
      <h4>{{ 'svc.catalog' | translate }}</h4>
      <span>{{ catalogOk ? ('ui.ok'|translate) : ('ui.off'|translate) }}</span>
    </div>
    <div class="tile" [class.ok]="ordersOk" (click)="open('catalog')">
      <h4>{{ 'svc.orders' | translate }}</h4>
      <span>{{ ordersOk ? ('ui.ok'|translate) : ('ui.off'|translate) }}</span>
    </div>
    <div class="tile" [class.ok]="logisticsOk" (click)="open('catalog')">
      <h4>Logistics</h4>
      <span>{{ logisticsOk ? ('ui.ok'|translate) : ('ui.off'|translate) }}</span>
    </div>
    <div class="tile" [class.ok]="crmOk" (click)="open('catalog')">
      <h4>CRM</h4>
      <span>{{ crmOk ? ('ui.ok'|translate) : ('ui.off'|translate) }}</span>
    </div>
    <div class="tile" [class.ok]="exportOk" (click)="open('catalog')">
      <h4>Export</h4>
      <span>{{ exportOk ? ('ui.ok'|translate) : ('ui.off'|translate) }}</span>
    </div>
  </div>
  `,
  styles: [`.tile{border:1px solid #ddd;border-radius:8px;padding:16px;cursor:pointer}
             .tile.ok{border-color:#4caf50}`],
  imports: [TranslateModule, NgIf]
})
export class TilesComponent implements OnInit {
  authOk=false; catalogOk=false; ordersOk=false; 
  logisticsOk=false; crmOk=false; exportOk=false;
  
  constructor(private svc: HealthService, private router: Router, private t: TranslateService) {}
  
  ngOnInit(){
    this.svc.ping('auth').subscribe({ next: _=> this.authOk=true });
    this.svc.ping('catalog').subscribe({ next: _=> this.catalogOk=true });
    this.svc.ping('orders').subscribe({ next: _=> this.ordersOk=true });
    this.svc.ping('logistics').subscribe({ next: _=> this.logisticsOk=true });
    this.svc.ping('crm').subscribe({ next: _=> this.crmOk=true });
    this.svc.ping('export').subscribe({ next: _=> this.exportOk=true });
  }
  
  open(path: string){ this.router.navigateByUrl('/'+path); }
}
