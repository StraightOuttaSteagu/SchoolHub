import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainRoutingModule } from './main-routing.module';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    IonicModule,
  ]
})
export class MainModule {
}
