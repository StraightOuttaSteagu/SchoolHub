import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CollapseAnimationFade } from '../../../../shared/animations';
import { AuthService } from '../../auth.service';

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

  constructor(private authService: AuthService) {
  }

  getMode(): boolean {
    return this.authService.getAuthMode() == 'signup';
  }

  onSubmit(): void {
    if (this.getMode()){
      if (this.authForm.valid){
        this.authService.register({
          login: this.authForm.value?.username,
          firstName: this.authForm.value?.firstName,
          lastName: this.authForm.value?.lastName,
          email: this.authForm.value?.email,
          password: this.authForm.value?.password
        });
      }
    } else if (this.authForm.get('username')?.valid && this.authForm.get('password')?.valid){
      this.authService.login({
        username: this.authForm.value?.username,
        password: this.authForm.value?.password,
        rememberMe: true
      });
    }
  }

  ngOnInit() {
    this.authForm = this.authService.initForm();

    this.authForm.get('password')?.valueChanges.subscribe(() => {
      this.authForm.get(('repeatPassword'))?.updateValueAndValidity();
    });
  }
}