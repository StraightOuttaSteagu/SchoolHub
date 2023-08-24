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
  pageAnimation = pageAnimation;

  organizations: any = [
    {name: 'Colegiul National de Informatica "Girgore Moisil"'},
    {name: 'Colegiul National "Andrei Saguna"'},
    {name: 'Colegiul National "Dr. Ioan Mesota'}
  ];
  classes: any = [
    {subject: 'Limba si literatura romana', teacher: 'Oteleanu lia', id: "1"},
    {subject: 'Arte Vizuale si activitati practice extracuriculare', teacher: 'Oteleanu lia', id: "2"},
    {subject: 'Biologie', teacher: 'Oteleanu lia maximus superbus extremus susus amugus', id: "690"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "4200"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "msg"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "seg"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "sdggsd"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "dsgd"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "dsbh"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "ghmhg"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "wtre"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "dfhw"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "erhj"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "rheje"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "werh"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "erhy"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "ethe5"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "wwth"},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: "hjjhh"},
  ];

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
}

