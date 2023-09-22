import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ChemistryPlayComponent } from './chemistry-play/chemistry-play.component';
import { SubscriptPipe } from './chemistry-play/formula.pipe';

@NgModule({
  declarations: [
    ChemistryPlayComponent,
    SubscriptPipe
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