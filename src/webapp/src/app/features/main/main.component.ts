import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { pageAnimation } from 'src/app/shared/animations';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClassService } from 'src/app/core/services/class.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  pageAnimation = pageAnimation;
  public alertButtons = ['Add class'];
  public alertInputs = [
    {
      placeholder: 'Enter organization ID',
    }
  ];
  organizations: any = [
    {name: 'Colegiul National de Informatica "Girgore Moisil"'},
    {name: 'Colegiul National "Andrei Saguna"'},
    {name: 'Colegiul National "Dr. Ioan Mesota'}
  ];
  classes: any[] = [
    {subject: 'Limba si literatura romana', teacher: 'Oteleanu lia', id: '1', theme: 'red'},
    {
      subject: 'Arte Vizuale si activitati practice extracuriculare',
      teacher: 'Oteleanu lia',
      id: '2',
      theme: 'default-theme'
    },
    {subject: 'Biologie', teacher: 'Oteleanu lia maximus superbus extremus susus amugus', id: '690', theme: 'green'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: '4200', theme: 'light-blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'msg', theme: 'orange'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'seg', theme: 'yellow'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'sdggsd', theme: 'pink'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'dsgd', theme: 'purple'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'dsbh', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'ghmhg', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'wtre', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'dfhw', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'erhj', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'rheje', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'werh', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'erhy', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'ethe5', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'wwth', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'hjjhh', theme: 'blue'},
  ];
  private _secondaryTheme: string | null = 'theme-default';

  constructor(private _theme: ThemeService, private _auth: AuthService, private _class: ClassService) {
  }

  ngOnInit(): void {
    this._secondaryTheme = this.classes.find(item => item.id == this.getClassID());
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

  getClassID(): string | null {
    return this._class.getClassID();
  }

  getSecondaryTheme(): string | null {
    return this._secondaryTheme;
  }

  setSecondaryTheme(theme: string): void {
    this._secondaryTheme = theme;
  }
}

