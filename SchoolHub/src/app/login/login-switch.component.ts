import { Component } from '@angular/core';
import { LoginInterractService } from './login-interract.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'login-switch',
  template: `<button [@status]="loginInterract.authMode" (click)="openLogin()" style="border-radius: 20px 0 0 20px; background-color: #342B66; color: #D9D9D9; border: none;font-size: 1.2rem;
  padding: 1.5rem 2rem 1.5rem 2rem;
  flex-grow: 1;
  white-space: nowrap;height: 100%; width: 130px; box-sizing: border-box;" class="sideBtn">Log In</button>`,
  animations: [
    trigger('status', [
      state('login', style({
        color: '#D9D9D9',
        backgroundColor: '#292251',
        border: 'none'
      })),
      state('signup', style({
        color: '#292251',
        backgroundColor: 'rgb(255, 255, 255, 00.3)',
        border: '2px solid rgba(255, 255, 255, 0.55)'
      })),
      transition('login => signup', animate('300ms linear')),
      transition('signup => login', animate('300ms linear'))
    ])
  ]
})
export class LoginSwitchComponent {
  constructor(public loginInterract: LoginInterractService) {}

  openLogin(){
    this.loginInterract.authMode = 'login';
  }
}