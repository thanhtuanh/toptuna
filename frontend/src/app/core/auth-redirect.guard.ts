// frontend/src/app/core/auth-redirect.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Wenn der Nutzer eingeloggt ist -> redirect zur Root '/'
   * Wenn nicht eingeloggt -> Zugriff erlauben (true)
   *
   * Verwende diese Guard an den Routen, die du bei Reload für eingeloggte Nutzer
   * auf die Root weiterleiten möchtest (z.B. '/login', '/admin', '/dashboard').
   */
  canActivate(): boolean | UrlTree {
    try {
      const loggedIn = !!this.authService && this.authService.isAuthenticated && this.authService.isAuthenticated();
      if (loggedIn) {
        // parseUrl erzeugt ein UrlTree, das Angular benutzt, um die Navigation zu ersetzen
        return this.router.parseUrl('/');
      }
    } catch (e) {
      // Falls AuthService aus irgendeinem Grund nicht verfügbar ist, erlaube den Zugriff
      console.warn('AuthRedirectGuard: Fehler beim Prüfen der Authentifizierung, Zugriff erlaubt.', e);
    }
    return true;
  }
}
