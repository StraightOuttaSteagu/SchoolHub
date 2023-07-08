import { Component } from '@angular/core';
import { LoginInterractService } from './login-interract.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'signup-switch',
  template: `<button [@status]="loginInterract.authMode" (click)="openSignup()" style="border-radius: 0 20px 20px 0;font-size: 1.2rem;
  padding: 1.5rem 2rem 1.5rem 2rem;
  flex-grow: 1;
  background-color: rgba(255, 255, 255, 0.30);
  color: #342B66;
  border: 2px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 4px 33px 4px rgba(0, 0, 0, 0.25);
  white-space: nowrap;box-sizing: border-box;width: 130px;height: 100%;">Sign Up</button>`,
  animations: [
    trigger('status', [
      state('login', style({
        color: '#292251',
        backgroundColor: 'rgb(255, 255, 255, 00.3)',
        border: '2px solid rgba(255, 255, 255, 0.55)'
      })),
      state('signup', style({
        color: '#D9D9D9',
        backgroundColor: '#292251',
        border: 'none'
      })),
      transition('login => signup', animate('300ms linear')),
      transition('signup => login', animate('300ms linear'))
    ])
  ]
})
export class SignupSwitchComponent {
  constructor(public loginInterract: LoginInterractService) {}

  openSignup(){
    this.loginInterract.authMode = 'signup';
  }
}
