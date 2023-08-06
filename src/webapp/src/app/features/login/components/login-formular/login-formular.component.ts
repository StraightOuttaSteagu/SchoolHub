import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'

import { LoginInterractService } from '../../login-interract.service';
import { FormAnimationFade, FormAnimationMargin } from '../../../../shared/expand.animation';
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

  constructor(private loginInterract: LoginInterractService, private authService: AuthService, private http: HttpClient) {
  }

  getMode(): 'true' | 'false' {
    return this.loginInterract.getAuthMode() == 'signup' ? 'true' : 'false';
  }

  onSubmit(): void {
    console.log(this.authForm.value);
    let data = {
      username: "Matei4321",
      //firstName: "Matei",
      //lastName: "Cazacu",
      //email: "matei444@gmail.com",
      password: "12345678",
      rememberMe: true
      //langKey: "ana"
    }
    this.http.post('http://localhost:8080/api/authenticate', data).subscribe({
      "next": val => {
        console.log("It worked!", val);
      },
      "error": err => {
        console.log("Something happened", err);
      }
    });
  }

  ngOnInit() {
    this.authForm = this.authService.initForm();

    this.authForm.get('password')?.valueChanges.subscribe(() => {
      this.authForm.get(('repeatPassword'))?.updateValueAndValidity();
    });
  }
}