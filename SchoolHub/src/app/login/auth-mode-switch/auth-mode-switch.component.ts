import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LoginInterractService } from '../login-interract.service';

@Component({
  selector: 'app-auth-mode-switch',
  templateUrl: './auth-mode-switch.component.html',
  styleUrls: ['./auth-mode-switch.component.scss'],
  animations : [
    trigger('status', [
      state('false', style({
        color: '#D9D9D9',
        backgroundColor: '#292251',
        border: 'none'
      })),
      state('true', style({
        color: '#292251',
        backgroundColor: 'rgb(255, 255, 255, 00.3)',
        border: '2px solid rgba(255, 255, 255, 0.55)'
      })),
      transition('true <=> false', animate('300ms linear'))
    ])
  ]
})
export class AuthModeSwitchComponent {
  interract: LoginInterractService = this.loginInterract;

  constructor(private loginInterract: LoginInterractService) {}

  openLogin(){
    this.loginInterract.setAuthMode('login');
  }

  openSignup(){
    this.loginInterract.setAuthMode('signup');
  }
}