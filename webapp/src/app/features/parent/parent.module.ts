import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentRoutingModule } from './parent-routing.module';
import { ParentComponent } from './parent.component';
import { IonicModule } from '@ionic/angular';
import { GradesComponent } from './grades/grades.component';
import { ChatModule } from '../../shared/chat/chat.module';
import { SettingsModule } from '../../shared/settings/settings.module';



@NgModule({
  declarations: [
    ParentComponent,
    GradesComponent
  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    IonicModule,
    ChatModule,
    SettingsModule
  ]
})
export class ParentModule { }