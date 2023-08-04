import { Component } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';

import { LoginInterractService } from '../../login-interract.service';
import { FormAnimationFade, FormAnimationMargin } from '../../login.animations';

@Component({
  selector: 'app-login-formular',
  templateUrl: './login-formular.component.html',
  styleUrls: ['./login-formular.component.scss'],
  animations: [
    FormAnimationFade,
    FormAnimationMargin
  ],
})
export class LoginFormularComponent {
  authForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(8)],
    repeatPassword: ['', Validators.required]
  });

  constructor(private loginInterract: LoginInterractService, private fb: FormBuilder) {}

  getMode(): 'login' | 'signup' {
    return this.loginInterract.getAuthMode()
  }

  onSubmit(): void {
    console.log(this.authForm.value);
  }
}