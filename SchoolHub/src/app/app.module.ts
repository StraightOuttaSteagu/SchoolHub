import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LineLogoComponent } from './line-logo/line-logo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormularComponent } from './login/login-formular.component';
import { AuthModeSwitchComponent } from './login/auth-mode-switch/auth-mode-switch.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    LineLogoComponent,
    LoginFormularComponent,
    AuthModeSwitchComponent
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
