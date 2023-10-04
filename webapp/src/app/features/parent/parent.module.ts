import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentRoutingModule } from './parent-routing.module';
import { ParentComponent } from './parent.component';
import { IonicModule } from '@ionic/angular';
import { GradesComponent } from './grades/grades.component';
import { SettingsModule } from '../../shared/settings/settings.module';
import { CardsSharedModule } from 'src/app/shared/cards-shared.module';
import { AttendanceComponent } from './attendance/attendance.component';



@NgModule({
  declarations: [
    ParentComponent,
    GradesComponent,
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    IonicModule,
    SettingsModule,
    CardsSharedModule
  ]
})
export class ParentModule { }
