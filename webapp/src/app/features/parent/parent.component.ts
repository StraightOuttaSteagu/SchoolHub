import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';
import { MenuController, ViewDidEnter } from '@ionic/angular';
import { icons } from '../../shared/icons';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  data = [
    {
      name: 'Otilia Marculescu'
    },
    {
      name: 'Felix Sima'
    }
  ];
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Add child',
      role: 'confirm',
    },
  ];
  public alertInputs = [
    {
      placeholder: 'Enter child id',
      name: 'name'
    }
  ];
  protected readonly document = document;
  protected readonly icons = icons;
  protected readonly window = window;

  constructor(private _theme: ThemeService, private _auth: AuthService, private _menu: MenuController) {
  }

  logOut(): void {
    this._auth.logout();
  }

  setTheme(theme: string): void {
    this._theme.setTheme(theme);
  }

  getTheme(): string | null {
    return this._theme.getTheme();
  }

  getHref(): string {
    return window.location.href;
  }
}
