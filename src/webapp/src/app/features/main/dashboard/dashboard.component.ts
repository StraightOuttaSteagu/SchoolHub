import { Component } from '@angular/core';
import { pageAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showNav: boolean = true;

  pageAnimation = pageAnimation;

  getHref(): string {
    return window.location.href;
  }
}
