import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor (private _theme: ThemeService) { }

  ngOnInit(): void {
    this._theme.initTheme();
  }
  
}
