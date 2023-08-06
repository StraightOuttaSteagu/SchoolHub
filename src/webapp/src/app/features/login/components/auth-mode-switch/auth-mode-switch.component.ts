import { Component } from '@angular/core';

import { SwitchAnimation } from '../../../../shared/animations';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-auth-mode-switch',
  templateUrl: './auth-mode-switch.component.html',
  styleUrls: ['./auth-mode-switch.component.scss'],
  animations : [
    SwitchAnimation
  ]
})
export class AuthModeSwitchComponent {
  constructor(private authService: AuthService) {}

  setMode(mode: 'login' | 'signup'){
    this.authService.setAuthMode(mode);
  }

  getMode(){
    return this.authService.getAuthMode();
  }
}