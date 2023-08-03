import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AnnouncementsComponent } from './announcements/announcements.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { GradesComponent } from './grades/grades.component';

@NgModule({
  declarations: [
    AnnouncementsComponent,
    AssignmentsComponent,
    AttendanceComponent,
    GradesComponent
  ],
  imports: [
    BrowserModule
  ]
})
export class DashboardPagesModule { }
