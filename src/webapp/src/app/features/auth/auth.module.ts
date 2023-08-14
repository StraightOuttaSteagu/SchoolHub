import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { AuthModeSwitchComponent } from './auth-mode-switch/auth-mode-switch.component';
import { AuthFormComponent } from './auth-form/auth-form.component';

import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AuthComponent,
    AuthModeSwitchComponent,
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    IonicModule
  ]
})
export class AuthModule {
}
