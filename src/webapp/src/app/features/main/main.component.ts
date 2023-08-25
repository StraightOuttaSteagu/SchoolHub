import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { pageAnimation } from 'src/app/shared/animations';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClassService } from 'src/app/core/services/class.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private _secondaryTheme!: string | null;

  pageAnimation = pageAnimation;

   Object = Object;

  organizations: any = [
    {name: 'Colegiul National de Informatica "Girgore Moisil"'},
    {name: 'Colegiul National "Andrei Saguna"'},
    {name: 'Colegiul National "Dr. Ioan Mesota'}
  ];
  classes: any = {
    "1": {subject: 'Limba si literatura romana', teacher: 'Oteleanu lia', theme: "green"},
    "2": {subject: 'Arte Vizuale si activitati practice extracuriculare', teacher: 'Oteleanu lia', theme: "red"},
    "69": {subject: 'Biologie', teacher: 'Oteleanu lia maximus superbus extremus susus amugus', theme: "blue"},
    "420": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "msg": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "seg": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "sdggsd": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "dsgd": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "dsbh": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "ghmhg": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "wtre": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "dfhw": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "erhj": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "rheje": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "werh": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "erhy": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "ethe5": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "wwth": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
    "hjjhh": {subject: 'Biologie', teacher: 'Oteleanu lia', theme: "blue"},
  };

  constructor(private _theme: ThemeService, private _auth: AuthService, private _class: ClassService) { }

  logOut(): void {
    this._auth.logOut();
  }

  setTheme(theme: string): void {
    this._theme.setTheme(theme);
  }

  getTheme(): string | null {
    return this._theme.getTheme();
  }

  getClassID(): string | null {
    return this._class.getClassID();
  }

  getSecondaryTheme(): string | null {
    return this._secondaryTheme;
  }

  setSecondaryTheme(theme: string): 'side-class-focus' {
    this._secondaryTheme = theme;
    return 'side-class-focus';
  }
}

