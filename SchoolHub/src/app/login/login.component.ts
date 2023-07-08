import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authType: boolean = false;

  toLogin(){
    this.authType = false;
  }

  toSignup(){
    this.authType = true;
  }
}
