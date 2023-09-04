import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ChatComponent } from './chat.component';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      { path: ':user', component: ChatComponent },
      { path: '', component: ChatComponent }
    ])
  ]
})
export class ChatModule { }
