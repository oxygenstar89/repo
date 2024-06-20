import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  isLightTheme = true;

  constructor() {
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      this.isLightTheme = false;
      this.setTheme();
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      this.isLightTheme = !event.matches;
      this.setTheme();
    });
   }

   toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    this.setTheme();
   }

   setTheme() {
    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );
  }
}
