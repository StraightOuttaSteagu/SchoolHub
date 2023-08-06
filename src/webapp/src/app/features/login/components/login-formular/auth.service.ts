import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginInterractService } from '../../login-interract.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authForm!: FormGroup;


  constructor(private fb: FormBuilder, private loginInteract: LoginInterractService) {
  }

  initForm() {
    this.authForm = this.fb.group({
      name: ['', this.nameValidator()],
      surname: ['', this.nameValidator()],
      username: ['', this.usernameValidator()],
      email: ['', this.emailValidator()],
      password: ['', this.passwordValidator()],
      repeatPassword: ['', [Validators.required]]
    });

    return this.authForm;
  }

  nameValidator(): ValidatorFn | null {
    return this.loginInteract.getAuthMode() === 'signup' ?
      Validators.compose([Validators.required, Validators.minLength(1)]) : Validators.nullValidator;
  }

  usernameValidator(): ValidatorFn | null {
    return Validators.compose([Validators.required, Validators.minLength(3)]);
  }

  emailValidator(): ValidatorFn | null {
    return this.loginInteract.getAuthMode() === 'signup' ? Validators.compose([Validators.required, Validators.email]) : Validators.nullValidator;
  }

  passwordValidator(): ValidatorFn | null {
    return Validators.compose([Validators.required, Validators.minLength(8)]);
  }

  RepeatPasswordValidator(): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const repeatPassword = control.get('repeatPassword')?.value;

      return password === repeatPassword ? null : {notSame: true};
    };
  }
}