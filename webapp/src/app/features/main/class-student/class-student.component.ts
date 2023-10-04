import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, ViewDidEnter, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ClassService } from 'src/app/core/state-management/class/class.service';
import { ClassState } from 'src/app/core/state-management/class/class.state';
import { ClassModel } from 'src/app/core/state-management/models';
import { OrganizationState } from 'src/app/core/state-management/organization/organization.state';
import { icons } from 'src/app/shared/icons';

@Component({
  selector: 'app-class-student',
  templateUrl: './class-student.component.html',
  styleUrls: ['./class-student.component.scss']
})
export class ClassStudentComponent implements ViewWillEnter, ViewWillLeave, ViewDidEnter {
  // The HTML for the classes will remain the same and the route will act as a filter that selects only some of the fields

  @Select(ClassState.selectClass) class$!: Observable<ClassModel>;

  @Select(OrganizationState.selectActiveOrganization) organization$!: Observable<any>;

  @Select(ClassState.selectClassData) data$!: Observable<any>;

  class: any = [];

  icons = icons;

  private _routerSubscription!: Subscription;

  filteredData: any = [];

  constructor (
    private _route: ActivatedRoute,
    private _theme: ThemeService,
    private _menu: MenuController,
    private _classService: ClassService
    ) { }

  ionViewWillEnter(): void {

    this._route.paramMap.subscribe(params => {
      let mode = params.get('mode');

      this.data$.subscribe({
        next: (data) => {
          console.log(mode)
          this.filteredData = mode == 'general' ? data : data.filter((el: any) => el.filterType === mode);
          console.log(this.filteredData)
        },
        error: () => {

        }
      });
      this._classService.setActiveClass(+params.get('id')!);
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
    this._classService.setActiveClass(-1);
  }

  getHref(): string {
    return window.location.href;
  }

  getClassThemeID(): string | null {
    return this._theme.getClassThemeID();
  }
}


/*
{
    title: "CARIOTIPUL UMAN PATOLOGIC",
    content: `vă rog să parcurgeti materialul atașat și să rezolvați, pe caiete, exercitiile I, II, si III din primul test.
    Atașati poza cu rezolvarea pana la sfarsitul zilei de luni, 27.03. 
    Sa aveti spor!`,
    subject: "Biologie",
    date: "10.10.2023",
    icon: 'leaf',
    due_date: "11.04.2023",
    type: "assignments",
    attachments_num: 3, 
    comments_num: 1
  },
  {
    title: "Realizare compoziție",
    content: "Realizați o compoziție plastică în care să redați atmosfera sărbătorilor de iarnă, și în care să aveți ca element principal un felinar.",
    subject: "Educație plastică",
    date: "01.10.2023",
    icon: 'pencils',
    due_date: "6.10.2023",
    type: "assignments",
    attachments_num: 2
  },
  {
    title: "CARIOTIPUL UMAN PATOLOGIC",
    content: `vă rog să parcurgeti materialul atașat și să rezolvați, pe caiete, exercitiile I, II, si III din primul test.
    Atașati poza cu rezolvarea pana la sfarsitul zilei de luni, 27.03. 
    Sa aveti spor!`,
    subject: "Biologie",
    date: "10.10.2023",
    icon: 'leaf',
    due_date: "11.04.2023",
    type: "announcements",
    attachments_num: 3, 
    comments_num: 1
  },
  { date: '6.09.2023', excused: false, type: 'attendance'},
    { grade: '10', date: '6.09.2023', type: 'grades'},
    { date: '6.09.2023', excused: false, type: 'attendance'},
*/