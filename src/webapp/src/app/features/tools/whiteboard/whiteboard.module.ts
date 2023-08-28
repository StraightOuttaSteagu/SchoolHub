import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { WhiteboardCreateComponent } from './whiteboard-create/whiteboard-create.component';

@NgModule({
  declarations: [
    WhiteboardCreateComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
        { path: 'create', component: WhiteboardCreateComponent },
        { path: 'create/:id', component: WhiteboardCreateComponent }
    ])
  ]
})
export class WhiteboardModule {
}
