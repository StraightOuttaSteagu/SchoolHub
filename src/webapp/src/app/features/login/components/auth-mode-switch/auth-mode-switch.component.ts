import { Component } from '@angular/core';
import { LoginInteractService } from '../../login-interact.service';

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
  constructor(private loginInteract: LoginInteractService) {}

  openLogin(){
    this.loginInteract.setAuthMode('login');
  }

  openSignup(){
    this.loginInteract.setAuthMode('signup');
  }

  getMode(){
    return this.loginInteract.getAuthMode();
  }
}