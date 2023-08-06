import { Component } from '@angular/core';
import { LoginInterractService } from '../../login-interract.service';

import { SwitchAnimation } from '../../../../shared/animations';

@Component({
  selector: 'app-auth-mode-switch',
  templateUrl: './auth-mode-switch.component.html',
  styleUrls: ['./auth-mode-switch.component.scss'],
  animations : [
    SwitchAnimation
  ]
})
export class AuthModeSwitchComponent {
  constructor(private loginInterract: LoginInterractService) {}

  openLogin(){
    this.loginInterract.setAuthMode('login');
  }

  openSignup(){
    this.loginInterract.setAuthMode('signup');
  }

  getMode(){
    return this.loginInterract.getAuthMode();
  }
}