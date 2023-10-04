import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ClassStudentComponent } from './class-student.component';
import { PipeModule } from 'src/app/shared/pipes.module';



@NgModule({
  declarations: [
    ClassStudentComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      { path: ':id/:mode', component: ClassStudentComponent }
    ]),
    PipeModule
  ]
})
export class ClassStudentModule { }
