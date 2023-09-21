import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ZygoteBodyComponent } from './zygote-body.component';

@NgModule({
  declarations: [
    ZygoteBodyComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
        { path: '', component: ZygoteBodyComponent }
    ])
  ]
})
export class ZygoteBodyModule {
}
