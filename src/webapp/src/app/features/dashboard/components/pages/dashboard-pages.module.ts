import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AnnouncementsComponent } from './announcements/announcements.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { GradesComponent } from './grades/grades.component';
import { MissingComponent } from './assignments/missing/missing.component';
import { AssignedComponent } from './assignments/assigned/assigned.component';
import { DoneComponent } from './assignments/done/done.component';
import { AssignmentsRoutingModule } from './assignments/assignments-routing.module';

@NgModule({
  declarations: [
    AnnouncementsComponent,
    AssignmentsComponent,
    AttendanceComponent,
    GradesComponent,
    MissingComponent,
    AssignedComponent,
    DoneComponent
  ],
  imports: [
    BrowserModule,
    AssignmentsRoutingModule
  ]
})
export class DashboardPagesModule { }
