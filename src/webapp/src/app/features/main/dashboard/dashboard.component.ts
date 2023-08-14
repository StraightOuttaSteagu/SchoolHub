import { Component } from '@angular/core';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showNav: boolean = true;

  getHref(): string {
    return window.location.href;
  }
}
