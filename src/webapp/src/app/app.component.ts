import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor (private theme: ThemeService) { }

  ngOnInit(): void {
    this.theme.updateTheme();
  }
  
}
