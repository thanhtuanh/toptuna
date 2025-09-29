import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { UserService } from './core/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TranslateModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentLang = 'de';

  constructor(
    private router: Router,
    private userService: UserService,
    private translate: TranslateService
  ) {
    this.currentLang = localStorage.getItem('toptuna_lang') || 'de';
    this.translate.setDefaultLang('de');
    this.translate.use(this.currentLang);
    console.log('Initial language set to:', this.currentLang);
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }

  switchLang(lang: string) {
    console.log('Switching to language:', lang);
    this.currentLang = lang;
    this.translate.use(lang).subscribe({
      next: () => console.log('Language switched to:', lang),
      error: (err) => console.error('Language switch failed:', err)
    });
    localStorage.setItem('toptuna_lang', lang);
  }
}