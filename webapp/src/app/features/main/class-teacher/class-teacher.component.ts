import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { MenuController, ViewDidEnter, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { icons } from '../../../shared/icons';
import { colors } from '../../../shared/colors';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClassService } from 'src/app/core/state-management/class/class.service';
import { ClassState } from 'src/app/core/state-management/class/class.state';
import { OrganizationState } from 'src/app/core/state-management/organization/organization.state';
import { Select } from '@ngxs/store';
import { ClassModel } from 'src/app/core/state-management/models';

@Component({
  selector: 'app-class-teacher',
  templateUrl: './class-teacher.component.html',
  styleUrls: ['./class-teacher.component.scss'],
})
export class ClassTeacherComponent implements ViewWillEnter, ViewWillLeave, ViewDidEnter {
  // The HTML for the classes will remain the same and the route will act as a filter that selects only some of the fields

  announcementForm = this._fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required]
  });

  assignmentForm = this._fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    deadline: [new Date(), Validators.required]
  });

  classId: any;

  @Select(ClassState.selectClass) class$!: Observable<ClassModel>;

  @Select(OrganizationState.selectActiveOrganization) organization$!: Observable<any>;

  @Select(ClassState.selectClassData) data$!: Observable<any>;

  icons = icons;

  private _routerSubscription!: Subscription;

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
    {date: '6.09.2023', excused: false, type: 'attendance'},
    {grade: '10', date: '6.09.2023', type: 'grades'},
    {date: '6.09.2023', excused: false, type: 'attendance'},
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
  today = new Date();
  protected readonly document = document;
  protected readonly Object = Object;
  protected readonly Date = Date;
  private dateSubscription!: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _theme: ThemeService,
    private _menu: MenuController,
    private _fb: FormBuilder,
    private _classService: ClassService
    ) {
    this.dateSubscription = interval(60000).subscribe(() => {
      this.today = new Date();
    })
  }

  toIsoString(date: Date) {
    let tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num: number) {
        return (num < 10 ? '0' : '') + num;
      };

    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(Math.floor(Math.abs(tzo) / 60)) +
      ':' + pad(Math.abs(tzo) % 60);
  }

  ionViewWillEnter(): void {
    this._route.paramMap.subscribe(params => {
      this._theme.setClassThemeID(params.get('id'));
      this._classService.setActiveClass(+params.get('id')!);
      this.classId = +params.get('id')!;
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
    this.dateSubscription.unsubscribe();
  }

  createAnnouncement(): void {
    if (this.announcementForm.valid) {
      this._classService.createAnnouncement(this.classId, this.announcementForm.controls.title.value!, this.announcementForm.controls.content.value!);
    }
  }

  createAssignment(): void {
    if (this.assignmentForm.valid) {
      this._classService.createAssignment(this.classId, this.assignmentForm.controls.title.value!, this.assignmentForm.controls.content.value!, this.assignmentForm.controls.deadline.value!)
      this.assignmentForm.getRawValue();
    }
  }

  getHref(): string {
    return window.location.href;
  }

  getClassThemeID(): string | null {
    return this._theme.getClassThemeID();
  }
}
