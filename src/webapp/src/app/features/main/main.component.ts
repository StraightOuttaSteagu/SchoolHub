import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { pageAnimation } from 'src/app/shared/animations';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  orgDropdownCollapsed: boolean = false;
  userDropDownCollapsed: boolean = false;

  pageAnimation = pageAnimation;

  organizations: any = [
    {name: 'Colegiul National de Informatica "Girgore Moisil"'},
    {name: 'Colegiul National "Andrei Saguna"'},
    {name: 'Colegiul National "Dr. Ioan Mesota'}
  ];
  classes: any = [
    {subject: 'Limba si literatura romana', teacher: 'Oteleanu lia'},
    {subject: 'Arte Vizuale si activitati practice extracuriculare', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia maximus superbus extremus susus amugus'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
    {subject: 'Biologie', teacher: 'Oteleanu lia'},
  ];

  constructor(private _theme: ThemeService, private _auth: AuthService) {
  }

  logOut(): void {
    this._auth.logOut();
  }

  setTheme(theme: string): void {
    this._theme.setTheme(theme);
  }

  getTheme(): string | null {
    return this._theme.getTheme();
  }
}

