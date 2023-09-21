import { Component } from '@angular/core';
import { MenuController, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.scss'],
})
export class DashboardTeacherComponent implements ViewDidEnter {
  constructor(private _menu: MenuController) {}

  getHref(): string {
    return window.location.href;
  }

  ionViewDidEnter(): void {
    this._menu.swipeGesture(true);
  }
}
