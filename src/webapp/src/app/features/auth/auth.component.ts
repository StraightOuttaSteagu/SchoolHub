import { Component } from '@angular/core';
import { AuthService } from './auth.service';

import { FormGroup } from '@angular/forms';

import { CollapseAnimationFade } from 'src/app/shared/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [CollapseAnimationFade]
})
export class AuthComponent {
  authForm!: FormGroup;

  constructor (private _auth: AuthService) {}

  getMode(){
    return this._auth.getAuthMode();
  }

  setMode(mode: 'login' | 'signup'){
    this._auth.setAuthMode(mode);
  }

  onSubmit(): void {
    if (!this.authForm.get('username')?.valid){
      this._auth.displayMessage("Invalid username");
      return;
    } else if (!this.authForm.get('password')?.valid){
      this._auth.displayMessage("Invalid password");
      return;
    }

    if (this.getMode()){
      if (!this.authForm.get('name')?.valid){
        this._auth.displayMessage("Invalid name");
        return;
      } else if (!this.authForm.get('surname')?.valid){
        this._auth.displayMessage("Invalid surname");
        return;
      } else if (!this.authForm.get('email')?.valid){
        this._auth.displayMessage("Invalid email");
        return;
      } else if (this.authForm.get('password')?.value != this.authForm.get('repeatPassword')?.value){
        this._auth.displayMessage("Passwords don't match");
        return;
      }
      this._auth.register({
        auth: this.authForm.value?.username,
        firstName: this.authForm.value?.firstName,
        lastName: this.authForm.value?.lastName,
        email: this.authForm.value?.email,
        password: this.authForm.value?.password
      });
    } else {
      this._auth.login({
        username: this.authForm.value?.username,
        password: this.authForm.value?.password,
        rememberMe: true
      });
    }
  }

  ngOnInit() {
    this.authForm = this._auth.initForm();
  }
}