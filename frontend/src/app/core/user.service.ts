import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

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

  setUser(user: any) {
    localStorage.setItem('toptuna_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  clearUser() {
    localStorage.removeItem('toptuna_user');
    this.currentUserSubject.next(null);
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}