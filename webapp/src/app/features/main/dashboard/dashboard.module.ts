import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { GradesComponent } from './grades/grades.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard.component';
import { CardsSharedModule } from '../../../shared/cards-shared.module';
import { PipeModule } from 'src/app/shared/pipes.module';
import { titleFormatPipe } from './title.pipe';



@NgModule({
  declarations: [
    AnnouncementsComponent,
    AssignmentsComponent,
    AttendanceComponent,
    GradesComponent,
    DashboardComponent,
    titleFormatPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IonicModule,
    CardsSharedModule,
    PipeModule
  ]
})
export class DashboardModule { }
