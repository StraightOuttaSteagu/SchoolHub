import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { MenuController, ViewDidEnter, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { icons } from '../../../shared/icons';
import { colors } from '../../../shared/colors';

@Component({
  selector: 'app-class-teacher',
  templateUrl: './class-teacher.component.html',
  styleUrls: ['./class-teacher.component.scss'],
})
export class ClassTeacherComponent implements ViewWillEnter, ViewWillLeave, ViewDidEnter {
  // The HTML for the classes will remain the same and the route will act as a filter that selects only some of the fields

  icons: any = icons;
  colors: any = colors;

  data: any[] = [
    {
      title: 'CARIOTIPUL UMAN PATOLOGIC',
      content: `vă rog să parcurgeti materialul atașat și să rezolvați, pe caiete, exercitiile I, II, si III din primul test.
    Atașati poza cu rezolvarea pana la sfarsitul zilei de luni, 27.03. 
    Sa aveti spor!`,
      subject: 'Biologie',
      date: '10.10.2023',
      icon: 'leaf',
      due_date: '11.04.2023',
      type: 'assignments',
      attachments_num: 3,
      comments_num: 1,
    },
    {
      title: 'Realizare compoziție',
      content:
        'Realizați o compoziție plastică în care să redați atmosfera sărbătorilor de iarnă, și în care să aveți ca element principal un felinar.',
      subject: 'Educație plastică',
      date: '01.10.2023',
      icon: 'pencils',
      due_date: '6.10.2023',
      type: 'assignments',
      attachments_num: 2,
    },
    {
      title: 'CARIOTIPUL UMAN PATOLOGIC',
      content: `vă rog să parcurgeti materialul atașat și să rezolvați, pe caiete, exercitiile I, II, si III din primul test.
    Atașati poza cu rezolvarea pana la sfarsitul zilei de luni, 27.03. 
    Sa aveti spor!`,
      subject: 'Biologie',
      date: '10.10.2023',
      icon: 'leaf',
      due_date: '11.04.2023',
      type: 'announcements',
      attachments_num: 3,
      comments_num: 1,
    },
    { date: '6.09.2023', excused: false, type: 'attendance' },
    { grade: '10', date: '6.09.2023', type: 'grades' },
    { date: '6.09.2023', excused: false, type: 'attendance' },
  ];
  deleteAlertButtons = [
    {
      text: 'Delete',
      role: 'destructive',
    },
    {
      text: 'Cancel',
      role: 'cancel',
    },
  ];
  selectedColor: number = 0;
  selectedIcon: number = 0;
  protected readonly document = document;
  protected readonly Object = Object;
  private _routerSubscription!: Subscription;

  constructor(private _route: ActivatedRoute, private _theme: ThemeService, private _menu: MenuController) {}

  ionViewWillEnter(): void {
    this._route.paramMap.subscribe(params => {
      this._theme.setClassThemeID(params.get('id'));
    });
  }

  ionViewDidEnter(): void {
    this._menu.swipeGesture(false);
  }

  ionViewWillLeave(): void {
    if (this._routerSubscription) {
      this._routerSubscription.unsubscribe();
    }

    this._theme.setClassThemeID(null);
  }

  getHref(): string {
    return window.location.href;
  }

  getClassThemeID(): string | null {
    return this._theme.getClassThemeID();
  }
}
