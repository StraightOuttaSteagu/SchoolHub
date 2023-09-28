import { Component } from '@angular/core';
import { PopoverController, ViewWillEnter } from '@ionic/angular';
import { UserPopoverComponent } from './user-popover/user-popover.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements ViewWillEnter {
  users: any = [
    {
      name: 'Irena Olteanu',
      username: '@irena',
      role: 'teacher',
    },
    {
      name: 'Irena Olteanu',
      username: '@irena',
      role: 'teacher',
    },
    {
      name: 'Irena Olteanu',
      username: '@irena',
      role: 'teacher',
    },
    {
      name: 'Irena Olteanu',
      username: '@irena',
      role: 'teacher',
    },
    {
      name: 'Irena Olteanu',
      username: '@irena',
      role: 'teacher',
    },
    {
      name: 'Irena Olteanu',
      username: '@irena',
      role: 'teacher',
    },
    {
      name: 'Irena Olteanu',
      username: '@irena',
      role: 'teacher',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    }, {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
    {
      name: 'Matei Cazacu',
      username: '@matei',
      role: 'student',
    },
  ];

  studentList: any;
  teacherList: any;

  constructor(private _popover: PopoverController) {
  }

  ionViewWillEnter() {
    this.studentList = this.users.filter((user: any) => user.role === 'student');
    this.teacherList = this.users.filter((user: any) => user.role === 'teacher');
  }

  async presentPopover(e: Event) {
    const popover = await this._popover.create({
      component: UserPopoverComponent,
      event: e,
    });

    await popover.present();
  }
}
