import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { UserService } from './core/user.service';
import { CartService } from './core/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TranslateModule, AsyncPipe, CommonModule],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  currentLang = 'de';
  readonly cartCount$;

  constructor(
    private router: Router,
    public userService: UserService,
    private translate: TranslateService,
    private cartService: CartService
  ) {
    this.cartCount$ = this.cartService.itemCount$;
  }

  ngOnInit() {
    this.currentLang = localStorage.getItem('toptuna_lang') || 'de';
    this.translate.setDefaultLang('de');
    this.translate.use(this.currentLang);
  }

  hasRole(roles: string[]): boolean {
    const user = this.userService.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }

  switchLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('toptuna_lang', lang);
  }
}
