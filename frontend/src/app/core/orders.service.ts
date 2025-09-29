import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from './api.config';

export interface OrderItem {
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id?: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  orderDate?: string;
  deliveryDate?: string;
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private http: HttpClient) {}

  getCustomerOrders(customerId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_BASE}/orders/customer/${customerId}`);
  }

  createOrder(order: Omit<Order, 'id' | 'orderDate'>): Observable<Order> {
    return this.http.post<Order>(`${API_BASE}/orders`, order);
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${API_BASE}/orders/${orderId}`);
  }
}