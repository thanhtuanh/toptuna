import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_BASE } from './api.config';
import { UserService, User } from './user.service';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    username: string;
    role: string;
    name: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_BASE}/auth/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('toptuna_token', response.token);
          // Convert response to User interface
          const user: User = {
            id: '1',
            username: response.user.username,
            email: `${response.user.username}@toptuna.de`,
            role: response.user.role as any,
            name: response.user.name,
            permissions: response.user.role === 'ADMIN' ? ['ALL'] : ['BASIC']
          };
          this.userService.setUser(user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('toptuna_token');
    this.userService.clearUser();
  }

  getToken(): string | null {
    return localStorage.getItem('toptuna_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}