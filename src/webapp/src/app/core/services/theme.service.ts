import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme: string | null = localStorage.getItem('theme');

  toggleTheme(){
    switch (this.theme){
      case 'light':
        this.theme = 'dark';
        break;

      case 'system':
        this.theme = 'light';
        break;

      default:
        this.theme = 'system';
    }
    this.updateTheme();
  }

  updateTheme(){
    switch (this.theme){
      case 'light':
        document.body.classList.add('light');
        document.body.classList.remove('dark');
        break;

      case 'dark':
        document.body.classList.add('dark');
        document.body.classList.remove('light');
        break;

      default:
        if (window.matchMedia("(prefers-color-scheme: dark)").matches){
          document.body.classList.add('dark');
          document.body.classList.remove('light');
        } else {
          document.body.classList.add('light');
          document.body.classList.remove('dark');
        }
    }
  }

  getTheme() {
    return this.theme;
  }
}