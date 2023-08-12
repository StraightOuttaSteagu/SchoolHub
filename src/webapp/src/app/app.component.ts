import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  theme: string | null = localStorage.getItem('theme');

  ngOnInit(): void {
    if (this.theme == 'light' || this.theme == 'dark'){
      document.body.classList.add(this.theme);
    } else {
      localStorage.setItem('theme', 'light');
      document.body.classList.add('light');
    }
  }
  
}
