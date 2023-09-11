import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ClassComponent } from './class.component';



@NgModule({
  declarations: [
    ClassComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      { path: ':id/:mode', component: ClassComponent }
    ])
  ]
})
export class ClassModule { }
