import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from './api.config';

export interface Route {
  id: string;
  driverName: string;
  vehicleId: string;
  date: string;
  status: string;
  stops: Stop[];
}

export interface Stop {
  id: string;
  customerId: string;
  customerName: string;
  address: string;
  timeWindow: string;
  status: string;
  haccpNotes?: string;
  temperature?: number;
}

@Injectable({ providedIn: 'root' })
export class LogisticsService {
  constructor(private http: HttpClient) {}

  getTodayRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(`${API_BASE}/logistics/routes/today`);
  }

  getRouteById(routeId: string): Observable<Route> {
    return this.http.get<Route>(`${API_BASE}/logistics/routes/${routeId}`);
  }

  updateStopStatus(routeId: string, stopId: string, status: string, haccpNotes?: string): Observable<void> {
    return this.http.put<void>(`${API_BASE}/logistics/routes/${routeId}/stops/${stopId}`, {
      status,
      haccpNotes
    });
  }
}