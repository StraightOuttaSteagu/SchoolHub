import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ClassTeacherComponent } from './class-teacher.component';
import { StudentsComponent } from './students/students.component';
import { StreamComponent } from './stream/stream.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClassTeacherComponent,
    StudentsComponent,
    StreamComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: ':id', component: ClassTeacherComponent, children: [
          {path: 'stream', component: StreamComponent},
          {path: 'students', component: StudentsComponent}
        ]
      }
    ]),
  ]
})
export class ClassTeacherModule {
}
