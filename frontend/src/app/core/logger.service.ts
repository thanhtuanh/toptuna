import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private isDev = !environment.production;

  log(message: string, ...args: any[]) {
    if (this.isDev) console.log(`[LOG] ${message}`, ...args);
  }

  warn(message: string, ...args: any[]) {
    if (this.isDev) console.warn(`[WARN] ${message}`, ...args);
  }

  error(message: string, ...args: any[]) {
    if (this.isDev) console.error(`[ERROR] ${message}`, ...args);
    // In production, could send to error tracking service
  }

  info(message: string, ...args: any[]) {
    if (this.isDev) console.info(`[INFO] ${message}`, ...args);
  }
}
