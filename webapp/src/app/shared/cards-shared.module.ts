import { NgModule } from '@angular/core';

import { AbsencesCardComponent } from './absences-card/absences-card.component';
import { GradesCardComponent } from './grades-card/grades-card.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { GradesAccordionComponent } from './grades-accordion/grades-accordion.component';
import { AbsencesAccordionComponent } from './absences-accordion/absences-accordion.component';


@NgModule({
  declarations: [
    AbsencesCardComponent,
    GradesCardComponent,
    GradesAccordionComponent,
    AbsencesAccordionComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    GradesCardComponent,
    GradesAccordionComponent,
    AbsencesCardComponent,
    AbsencesAccordionComponent
  ]
})
export class CardsSharedModule {
}
