import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { IonicModule } from '@ionic/angular';
import { UserPopoverComponent } from './user-popover/user-popover.component';



@NgModule({
  declarations: [
    AdminComponent,
    UserPopoverComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AdminComponent, children: [
        
      ]}
    ]),
    IonicModule
  ]
})
export class AdminModule { }
