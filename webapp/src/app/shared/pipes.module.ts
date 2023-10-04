import { NgModule } from '@angular/core';
import { DateFormatPipe } from './chat/chat.pipe';

@NgModule({
  declarations: [
    DateFormatPipe
  ],
  exports: [
    DateFormatPipe
  ]
})
export class PipeModule {
}
