import { Component } from '@angular/core';
import { pageAnimation } from 'src/app/shared/animations';
import { MenuController, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements ViewDidEnter {
  showNav: boolean = true;

  pageAnimation = pageAnimation;

  constructor(private _menu: MenuController) { }

  getHref(): string {
    return window.location.href;
  }

  ionViewDidEnter(): void {
    this._menu.swipeGesture(true);
  }
}
