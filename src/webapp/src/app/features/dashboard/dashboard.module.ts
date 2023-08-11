import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { AssignedComponent } from './pages/assignments/assigned/assigned.component';
import { AssignmentsCardComponent } from './pages/assignments/assignments-card/assignments-card.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { DoneComponent } from './pages/assignments/done/done.component';
import { MissingComponent } from './pages/assignments/missing/missing.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { GradesComponent } from './pages/grades/grades.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    AnnouncementsComponent,
    AssignmentsComponent,
    AttendanceComponent,
    GradesComponent,
    AssignedComponent,
    DoneComponent,
    MissingComponent,
    AssignmentsCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
