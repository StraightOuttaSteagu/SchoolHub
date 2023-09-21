import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PostComponent } from './post.component';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      { path: ':id', component: PostComponent }
    ])
  ]
})
export class PostModule { }
