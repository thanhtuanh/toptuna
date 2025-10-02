import { Injectable } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  show(type: NotificationType, message: string, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
      success: '#10b981',
      error: '#ef4444', 
      info: '#3b82f6',
      warning: '#f59e0b'
    };
    
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 1000;
      padding: 12px 20px; border-radius: var(--tt-radius); color: white;
      background: ${colors[type]}; box-shadow: var(--tt-shadow);
      font-weight: 500; font-family: var(--tt-font-sans);
      transform: translateX(100%); transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    
    // Remove after duration
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }

  success(message: string) { this.show('success', message); }
  error(message: string) { this.show('error', message); }
  info(message: string) { this.show('info', message); }
  warning(message: string) { this.show('warning', message); }
}
