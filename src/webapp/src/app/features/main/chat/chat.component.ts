import { Component } from '@angular/core';
import { MenuController, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements ViewDidEnter {
  constructor(private _menu: MenuController) { }

  ionViewDidEnter(): void {
    this._menu.swipeGesture(false);
  }
}
