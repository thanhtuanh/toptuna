import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from './api.config';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  segment: string;
  city: string;
  status: string;
}

export interface CustomerSegment {
  name: string;
  count: number;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class CrmService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_BASE}/crm/customers`);
  }

  getCustomerSegments(): Observable<CustomerSegment[]> {
    return this.http.get<CustomerSegment[]>(`${API_BASE}/crm/customers/segments`);
  }

  getCustomerById(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(`${API_BASE}/crm/customers/${customerId}`);
  }
}