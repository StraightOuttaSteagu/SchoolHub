import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authMode: 'login' | 'signup' = 'signup';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  public setAuthMode(mode: 'login' | 'signup'){
    this.authMode = mode;
  }

  public getAuthMode(){
    return this.authMode;
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', this.nameValidator()],
      surname: ['', this.nameValidator()],
      username: ['', this.usernameValidator()],
      email: ['', this.emailValidator()],
      password: ['', this.passwordValidator()],
      repeatPassword: ['', this.RepeatPasswordValidator()]
    });
  }

  nameValidator(): ValidatorFn | null {
    return this.authMode === 'signup' ?
      Validators.compose([Validators.required, Validators.minLength(1)]) : Validators.nullValidator;
  }

  usernameValidator(): ValidatorFn | null {
    return Validators.compose([Validators.required, Validators.minLength(3)]);
  }

  emailValidator(): ValidatorFn | null {
    return this.authMode === 'signup' ? Validators.compose([Validators.required, Validators.email]) : Validators.nullValidator;
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

  login(form: FormGroup) {
    this.http.post('http://localhost:8080/api/authenticate', {
      username: form.value?.username,
      password: form.value?.password,
      rememberMe: true
    }).subscribe({
      "next": val => {
        
      },
      "error": err => {
        console.log(err)
      }
    });
  }

  register(form: FormGroup) {
    this.http.post('http://localhost:8080/api/register', {
      login: form.value?.username,
      firstName: form.value?.firstName,
      lastName: form.value?.lastName,
      email: form.value?.email,
      password: form.value?.password
    }).subscribe({
      "next": val => {
        
      },
      "error": err => {
        
      }
    });
  }
}