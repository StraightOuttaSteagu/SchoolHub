import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ChemistryPlayComponent } from './chemistry-play/chemistry-play.component';

@NgModule({
  declarations: [
    ChemistryPlayComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      { path: 'play', component: ChemistryPlayComponent }
  ])
  ]
})
export class ChemistryModule {
}