import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CollapseAnimationFade } from '../../../shared/animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  animations: [
    CollapseAnimationFade,
  ],
}) 
export class AuthFormComponent implements OnInit {
  authForm!: FormGroup;

  constructor(private authService: AuthService) {
  }

  getMode(): boolean {
    return this.authService.getAuthMode() == 'signup';
  }

  onSubmit(): void {
    if (!this.authForm.get('username')?.valid){
      this.authService.displayMessage("Invalid username");
      return;
    } else if (!this.authForm.get('password')?.valid){
      this.authService.displayMessage("Invalid password");
      return;
    }

    if (this.getMode()){
      if (!this.authForm.get('name')?.valid){
        this.authService.displayMessage("Invalid name");
        return;
      } else if (!this.authForm.get('surname')?.valid){
        this.authService.displayMessage("Invalid surname");
        return;
      } else if (!this.authForm.get('email')?.valid){
        this.authService.displayMessage("Invalid email");
        return;
      } else if (this.authForm.get('password')?.value != this.authForm.get('repeatPassword')?.value){
        this.authService.displayMessage("Passwords don't match");
        return;
      }
      this.authService.register({
        auth: this.authForm.value?.username,
        firstName: this.authForm.value?.firstName,
        lastName: this.authForm.value?.lastName,
        email: this.authForm.value?.email,
        password: this.authForm.value?.password
      });
    } else {
      this.authService.login({
        username: this.authForm.value?.username,
        password: this.authForm.value?.password,
        rememberMe: true
      });
    }
  }

  ngOnInit() {
    this.authForm = this.authService.initForm();
  }
}