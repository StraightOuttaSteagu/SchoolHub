import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ClassRoutingModule } from './class-routing.module';
import { ClassComponent } from './class.component';



@NgModule({
  declarations: [
    ClassComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ClassRoutingModule
  ]
})
export class ClassModule { }
