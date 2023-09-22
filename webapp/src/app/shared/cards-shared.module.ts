import { NgModule } from '@angular/core';

import { AbsencesCardComponent } from './absences-card/absences-card.component';
import { GradesCardComponent } from './grades-card/grades-card.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AbsencesCardComponent,
    GradesCardComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    GradesCardComponent
  ]
})
export class CardsSharedModule { }
