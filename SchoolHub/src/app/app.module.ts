import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LineLogoComponent } from './line-logo/line-logo.component';
import { LoginSwitchComponent } from './login/login-switch.component';
import { SignupSwitchComponent } from './login/signup-switch.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormularComponent } from './login/login-formular.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    LineLogoComponent,
    LoginSwitchComponent,
    SignupSwitchComponent,
    LoginFormularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
