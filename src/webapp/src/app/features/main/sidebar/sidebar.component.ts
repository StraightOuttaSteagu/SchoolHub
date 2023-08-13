import { Component } from '@angular/core';
import { CollapseAnimationFade } from '../../../shared/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [CollapseAnimationFade]
})
export class SidebarComponent {
  orgDropdownCollapsed: boolean = false;
  userDropDownCollapsed: boolean = false;

  theme: string | null = window.localStorage.getItem('theme');

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
  ];
  protected readonly window = window;

  deleteToken() {
    localStorage.removeItem('token');
  }

  toggleTheme() {
    if (this.theme === 'light') {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }
    window.localStorage.setItem('theme', this.theme);
    window.location.reload();
  }

  getOutputTheme() {
    if (this.theme === 'light') {
      return 'Dark';
    }
    return 'Light';
  }
}
