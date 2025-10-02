import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UserService, User } from '../../core/user.service';
import { LoggerService } from '../../core/logger.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>🐟 TopTuna B2B</h1>
          <p>Demo-Login für alle Rollen</p>
        </div>
        
        <div class="demo-users">
          <h3>Demo-Benutzer auswählen:</h3>
          <div class="user-grid">
            <div *ngFor="let user of demoUsers" 
                 class="user-card" 
                 (click)="loginAsUser(user)">
              <div class="user-role">{{ user.role }}</div>
              <div class="user-name">{{ user.name }}</div>
              <div class="user-email">{{ user.email }}</div>
              <div class="user-permissions">
                <span *ngFor="let perm of getDisplayPermissions(user)" class="permission-badge">
                  {{ perm }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="login-info">
          <h4>🎯 Rollen-Übersicht:</h4>
          <ul>
            <li><strong>ADMIN</strong> - Vollzugriff auf alle Bereiche</li>
            <li><strong>MARKETING</strong> - Katalog & Marketing-Tools</li>
            <li><strong>DISPO</strong> - Bestellungen & Logistik</li>
            <li><strong>DRIVER</strong> - Lieferungen & GPS-Tracking</li>
            <li><strong>ACCOUNTING</strong> - Buchhaltung & Export</li>
            <li><strong>CUSTOMER</strong> - Shop & eigene Bestellungen</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--tt-primary) 0%,var(--tt-primary-700) 100%);padding:var(--tt-space-2)}
    .login-card{background:var(--tt-bg);border-radius:var(--tt-radius);padding:var(--tt-space-4);box-shadow:var(--tt-shadow);max-width:800px;width:100%}
    .login-header{text-align:center;margin-bottom:var(--tt-space-4)}
    .login-header h1{color:var(--tt-primary);font-size:2.5rem;margin-bottom:var(--tt-space-1);font-weight:800}
    .login-header p{color:var(--tt-text);font-size:1.1rem}
    .demo-users h3{color:var(--tt-primary);margin-bottom:var(--tt-space-2);font-weight:700}
    .user-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:var(--tt-space-2);margin-bottom:var(--tt-space-4)}
    .user-card{background:var(--tt-surface);border:2px solid var(--tt-primary);border-radius:var(--tt-radius);padding:var(--tt-space-3);cursor:pointer;transition:all .2s;text-align:center}
    .user-card:hover{transform:translateY(-4px);box-shadow:0 8px 32px rgba(14,165,233,.15);border-color:var(--tt-accent)}
    .user-role{font-weight:700;font-size:1.1rem;color:var(--tt-primary);margin-bottom:var(--tt-space-1)}
    .user-name{font-weight:500;color:var(--tt-text);margin-bottom:.25rem}
    .user-email{font-size:.9rem;color:var(--tt-muted);margin-bottom:var(--tt-space-2)}
    .user-permissions{display:flex;flex-wrap:wrap;gap:.25rem;justify-content:center}
    .permission-badge{background:var(--tt-primary);color:white;padding:.25rem .5rem;border-radius:999px;font-size:.7rem;font-weight:500}
    .login-info{background:var(--tt-surface);border-radius:var(--tt-radius);padding:var(--tt-space-3);border-left:4px solid var(--tt-primary)}
    .login-info h4{color:var(--tt-primary);margin-bottom:var(--tt-space-2);font-weight:700}
    .login-info ul{list-style:none;padding:0}
    .login-info li{padding:var(--tt-space-1) 0;border-bottom:1px solid var(--tt-border);color:var(--tt-text)}
    .login-info li:last-child{border-bottom:none}
    .login-info strong{color:var(--tt-primary)}
    @media (max-width:768px){
    .login-card{padding:var(--tt-space-2);margin:var(--tt-space-1)}
    .user-grid{grid-template-columns:1fr}
    .login-header h1{font-size:2rem}
    }
  `]
})
export class LoginComponent {
  demoUsers: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private logger: LoggerService
  ) {
    this.demoUsers = this.userService.getDemoUsers();
  }

  loginAsUser(user: User) {
    this.userService.setUser(user);
    this.logger.info('User logged in', { role: user.role, name: user.name });
    this.router.navigate(['/dashboard']);
  }

  getDisplayPermissions(user: User): string[] {
    if (user.permissions.includes('ALL')) {
      return ['ALLE RECHTE'];
    }
    return user.permissions.slice(0, 3);
  }
}
