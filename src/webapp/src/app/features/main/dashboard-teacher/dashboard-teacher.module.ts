import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { DashboardTeacherRoutingModule } from './dashboard-teacher-routing.module';
import { IonicModule } from '@ionic/angular';
import { DashboardTeacherComponent } from './dashboard-teacher.component';



@NgModule({
  declarations: [
    AssignmentsComponent,
    AnnouncementsComponent,
    DashboardTeacherComponent
  ],
  imports: [
    CommonModule,
    DashboardTeacherRoutingModule,
    IonicModule
  ]
})
export class DashboardTeacherModule { }
