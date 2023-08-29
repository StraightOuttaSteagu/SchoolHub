import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { GradesComponent } from './grades/grades.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    AnnouncementsComponent,
    AssignmentsComponent,
    AttendanceComponent,
    GradesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IonicModule
  ]
})
export class DashboardModule { }
