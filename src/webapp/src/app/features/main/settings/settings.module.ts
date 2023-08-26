import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      { path: '', component: SettingsComponent }
    ]),
  ]
})
export class SettingsModule { }
