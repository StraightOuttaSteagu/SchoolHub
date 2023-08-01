import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { AuthModeSwitchComponent } from './components/auth-mode-switch/auth-mode-switch.component';
import { LoginFormularComponent } from './components/login-formular/login-formular.component';

import { LineLogoComponent } from 'src/app/shared/line-logo/line-logo.component';



@NgModule({
  declarations: [
    LoginComponent,
    AuthModeSwitchComponent,
    LoginFormularComponent,
    LineLogoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class LoginModule { }
