import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentsCardComponent } from './assignments/assignments-card/assignments-card.component';
import { AssignedComponent } from './assignments/assigned/assigned.component';
import { MissingComponent } from './assignments/missing/missing.component';
import { DoneComponent } from './assignments/done/done.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { GradesComponent } from './grades/grades.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    AnnouncementsComponent,
    AssignmentsComponent,
    AssignmentsCardComponent,
    AssignedComponent,
    MissingComponent,
    DoneComponent,
    AttendanceComponent,
    GradesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
