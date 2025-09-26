import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { API_BASE } from '../../core/api.config';

@Component({
  standalone: true,
  selector: 'app-login',
  template: `
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div style="background: white; padding: 3rem; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); min-width: 400px; max-width: 500px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🐟</div>
        <h1 style="font-size: 2rem; font-weight: 700; color: var(--primary-blue); margin-bottom: 0.5rem;">
          {{ 'login.title' | translate }}
        </h1>
        <p style="color: var(--text-secondary);">B2B Portal für Fischgroßhandel</p>
      </div>
      
      <form (ngSubmit)="login()" style="margin-bottom: 2rem;">
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-primary);">
            {{ 'login.username' | translate }}
          </label>
          <input 
            type="text" 
            [(ngModel)]="username" 
            name="username" 
            required
            style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 0.5rem; font-size: 1rem; transition: border-color 0.2s;"
            [style.border-color]="error ? 'var(--error)' : 'var(--border)'"
          >
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-primary);">
            {{ 'login.password' | translate }}
          </label>
          <input 
            type="password" 
            [(ngModel)]="password" 
            name="password" 
            required
            style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 0.5rem; font-size: 1rem; transition: border-color 0.2s;"
            [style.border-color]="error ? 'var(--error)' : 'var(--border)'"
          >
        </div>
        
        <button 
          type="submit" 
          [disabled]="loading"
          class="btn btn-primary"
          style="width: 100%; padding: 0.875rem; font-size: 1rem; margin-bottom: 1rem;"
        >
          <span *ngIf="loading" class="loading" style="margin-right: 0.5rem;"></span>
          {{ loading ? ('ui.loading' | translate) : ('login.login_button' | translate) }}
        </button>
        
        <div *ngIf="error" style="color: var(--error); background: #fee2e2; padding: 0.75rem; border-radius: 0.5rem; font-size: 0.875rem;">
          {{error}}
        </div>
      </form>
      
      <div style="border-top: 1px solid var(--border); padding-top: 1.5rem;">
        <h4 style="margin-bottom: 1rem; color: var(--text-primary); font-size: 1rem;">
          {{ 'login.demo_users' | translate }}:
        </h4>
        
        <div 
          style="padding: 0.75rem; background: var(--surface); border-radius: 0.5rem; cursor: pointer; margin-bottom: 0.5rem; transition: background-color 0.2s;"
          (click)="setCredentials('admin', 'admin')"
          (mouseenter)="$event.target.style.backgroundColor = 'var(--secondary)'"
          (mouseleave)="$event.target.style.backgroundColor = 'var(--surface)'"
        >
          <div style="font-weight: 600; color: var(--primary-blue);">admin / admin</div>
          <div style="font-size: 0.875rem; color: var(--text-secondary);">{{ 'login.admin_desc' | translate }}</div>
        </div>
        
        <div 
          style="padding: 0.75rem; background: var(--surface); border-radius: 0.5rem; cursor: pointer; margin-bottom: 0.5rem; transition: background-color 0.2s;"
          (click)="setCredentials('saigon_sushi', 'test')"
          (mouseenter)="$event.target.style.backgroundColor = 'var(--secondary)'"
          (mouseleave)="$event.target.style.backgroundColor = 'var(--surface)'"
        >
          <div style="font-weight: 600; color: var(--primary-blue);">saigon_sushi / test</div>
          <div style="font-size: 0.875rem; color: var(--text-secondary);">{{ 'login.restaurant_desc' | translate }}</div>
        </div>
        
        <div 
          style="padding: 0.75rem; background: var(--surface); border-radius: 0.5rem; cursor: pointer; transition: background-color 0.2s;"
          (click)="setCredentials('driver_duc', 'test')"
          (mouseenter)="$event.target.style.backgroundColor = 'var(--secondary)'"
          (mouseleave)="$event.target.style.backgroundColor = 'var(--surface)'"
        >
          <div style="font-weight: 600; color: var(--primary-blue);">driver_duc / test</div>
          <div style="font-size: 0.875rem; color: var(--text-secondary);">{{ 'login.driver_desc' | translate }}</div>
        </div>
      </div>
    </div>
  </div>
  `,
  imports: [FormsModule, NgIf, TranslateModule]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  setCredentials(user: string, pass: string) {
    this.username = user;
    this.password = pass;
    this.error = '';
  }

  login() {
    if (!this.username || !this.password) {
      this.error = 'Bitte Benutzername und Passwort eingeben';
      return;
    }

    this.loading = true;
    this.error = '';

    this.http.post(`${API_BASE}/auth/login`, {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.success) {
          localStorage.setItem('toptuna_user', JSON.stringify(response));
          
          if (response.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.error = response.message || 'Anmeldung fehlgeschlagen';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      }
    });
  }
}
