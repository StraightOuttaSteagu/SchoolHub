import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteboardDrawComponent } from './whiteboard-draw.component';
import { NgWhiteboardModule } from 'ng-whiteboard';
import { RouterModule } from '@angular/router';
import { NgxColorsModule } from 'ngx-colors';


@NgModule({
  declarations: [
    WhiteboardDrawComponent,
  ],
  imports: [
    CommonModule,
    NgWhiteboardModule,
    RouterModule.forChild([
      {path: '', component: WhiteboardDrawComponent}
    ]),
    NgxColorsModule
  ]
})
export class WhiteboardDrawModule {
}
