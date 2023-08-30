import { Component } from '@angular/core';
import { MenuController, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements ViewDidEnter {
  editable: boolean = false;
  profileData = {
    username: 'irena',
    name: 'Irena',
    surname: 'Olteanu',
    email: 'irena@olteanu.ro',
  };

  constructor(private _menu: MenuController) { }

  ionViewDidEnter(): void {
    this._menu.swipeGesture(false);
  }
}
