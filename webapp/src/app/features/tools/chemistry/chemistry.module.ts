import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ChemistryPlayComponent } from './chemistry-play/chemistry-play.component';
import { ChemistryPopoverComponent } from './chemistry-play/chemistry-popover/chemistry-popover.component';
import { ElementPopoverComponent } from './chemistry-play/element-popover/element-popover.component';

@NgModule({
  declarations: [
    ChemistryPlayComponent,
    ChemistryPopoverComponent,
    ElementPopoverComponent
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