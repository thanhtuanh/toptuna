import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'MARKETING' | 'DISPO' | 'DRIVER' | 'ACCOUNTING' | 'CUSTOMER';
  name: string;
  permissions: string[];
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Demo-Benutzer für alle Rollen
  private demoUsers: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@toptuna.de',
      role: 'ADMIN',
      name: 'Administrator',
      permissions: ['ALL']
    },
    {
      id: '2', 
      username: 'marketing',
      email: 'marketing@toptuna.de',
      role: 'MARKETING',
      name: 'Marketing Manager',
      permissions: ['CATALOG_READ', 'CATALOG_WRITE', 'MARKETING']
    },
    {
      id: '3',
      username: 'dispo',
      email: 'dispo@toptuna.de', 
      role: 'DISPO',
      name: 'Disposition',
      permissions: ['ORDERS_READ', 'ORDERS_WRITE', 'LOGISTICS_READ']
    },
    {
      id: '4',
      username: 'driver',
      email: 'driver@toptuna.de',
      role: 'DRIVER', 
      name: 'Fahrer',
      permissions: ['LOGISTICS_READ', 'DELIVERY_UPDATE']
    },
    {
      id: '5',
      username: 'accounting',
      email: 'accounting@toptuna.de',
      role: 'ACCOUNTING',
      name: 'Buchhaltung',
      permissions: ['ACCOUNTING_READ', 'ACCOUNTING_WRITE', 'EXPORT']
    },
    {
      id: '6',
      username: 'customer',
      email: 'kunde@restaurant-saigon.de',
      role: 'CUSTOMER',
      name: 'Restaurant Saigon',
      permissions: ['SHOP_READ', 'ORDERS_READ']
    }
  ];

  constructor() {
    // Initialize from localStorage
    const storedUser = localStorage.getItem('toptuna_user');
    if (storedUser) {
      try {
        this.currentUserSubject.next(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('toptuna_user');
      }
    }
  }

  // Demo-Login Funktion
  loginDemo(username: string): User | null {
    const user = this.demoUsers.find(u => u.username === username);
    if (user) {
      this.setUser(user);
      return user;
    }
    return null;
  }

  // Alle Demo-Benutzer abrufen
  getDemoUsers(): User[] {
    return this.demoUsers;
  }

  setUser(user: User) {
    localStorage.setItem('toptuna_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  clearUser() {
    localStorage.removeItem('toptuna_user');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    if (user.permissions.includes('ALL')) return true;
    return user.permissions.includes(permission);
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }
}