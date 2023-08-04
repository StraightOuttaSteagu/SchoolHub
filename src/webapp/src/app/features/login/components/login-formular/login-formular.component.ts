import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginInterractService } from '../../login-interract.service';
import { FormAnimationFade, FormAnimationMargin } from '../../login.animations';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login-formular',
  templateUrl: './login-formular.component.html',
  styleUrls: ['./login-formular.component.scss'],
  animations: [
    FormAnimationFade,
    FormAnimationMargin
  ],
})
export class LoginFormularComponent implements OnInit {
  authForm!: FormGroup;

  constructor(private loginInterract: LoginInterractService, private authService: AuthService) {
  }

  getMode(): 'login' | 'signup' {
    return this.loginInterract.getAuthMode();
  }

  onSubmit(): void {
    console.log(this.authForm.value);
  }

  ngOnInit() {
    this.authForm = this.authService.initForm();

    this.authForm.get('password')?.valueChanges.subscribe(() => {
      this.authForm.get(('repeatPassword'))?.updateValueAndValidity();
    });
  }
}