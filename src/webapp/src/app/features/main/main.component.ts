import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  orgDropdownCollapsed: boolean = false;
  userDropDownCollapsed: boolean = false;
  organizations = [
    {name: 'Colegiul National de Informatica "Girgore Moisil"'},
    {name: 'Colegiul National "Andrei Saguna"'},
    {name: 'Colegiul National "Dr. Ioan Mesota'}
  ];
  classes = [
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
  protected readonly window = window;

  constructor(private theme: ThemeService) {
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  toggleTheme() {
    this.theme.toggleTheme();
  }

  getTheme() {
    return this.theme.getTheme();
  }
}

