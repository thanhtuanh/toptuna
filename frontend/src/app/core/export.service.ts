import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from './api.config';

export interface ExportData {
  type: 'datev' | 'csv';
  format: 'invoices' | 'customers' | 'orders';
  dateFrom?: string;
  dateTo?: string;
}

@Injectable({ providedIn: 'root' })
export class ExportService {
  constructor(private http: HttpClient) {}

  exportDatev(format: 'invoices' | 'customers', dateFrom?: string, dateTo?: string): Observable<Blob> {
    const params: any = {};
    if (dateFrom) params.from = dateFrom;
    if (dateTo) params.to = dateTo;
    
    return this.http.get(`${API_BASE}/export/datev/${format}`, {
      params,
      responseType: 'blob'
    });
  }

  exportCsv(format: 'orders' | 'customers', dateFrom?: string, dateTo?: string): Observable<Blob> {
    const params: any = {};
    if (dateFrom) params.from = dateFrom;
    if (dateTo) params.to = dateTo;
    
    return this.http.get(`${API_BASE}/export/csv/${format}`, {
      params,
      responseType: 'blob'
    });
  }

  downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}