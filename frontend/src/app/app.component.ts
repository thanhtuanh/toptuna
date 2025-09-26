import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LangSwitchComponent } from './shared/lang-switch/lang-switch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LangSwitchComponent, NgIf],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  currentUser: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('toptuna_user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }

  logout() {
    localStorage.removeItem('toptuna_user');
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}
