import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { AuthModeSwitchComponent } from './components/auth-mode-switch/auth-mode-switch.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { LineLogoComponent } from 'src/app/shared/line-logo/line-logo.component';



@NgModule({
  declarations: [
    LoginComponent,
    AuthModeSwitchComponent,
    LoginFormComponent,
    LineLogoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ]
})
export class LoginModule { }
