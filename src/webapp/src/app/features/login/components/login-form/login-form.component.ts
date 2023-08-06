import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'

import { LoginInteractService } from '../../login-interact.service';
import { CollapseAnimationFade } from '../../../../shared/animations';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [
    CollapseAnimationFade,
  ],
}) 
export class LoginFormComponent implements OnInit {
  authForm!: FormGroup;

  constructor(private loginInteract: LoginInteractService, private authService: AuthService, private http: HttpClient) {
  }

  getMode(): 'true' | 'false' {
    return this.loginInteract.getAuthMode() == 'signup' ? 'true' : 'false';
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