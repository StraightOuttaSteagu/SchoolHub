import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentRoutingModule } from './dashboard-teacher-routing.module';
import { ParentComponent } from './parent.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ParentComponent
  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    IonicModule
  ]
})
export class ParentModule { }
