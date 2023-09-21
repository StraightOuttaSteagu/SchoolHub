import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CollapseAnimationFade } from 'src/app/shared/animations';
import { SnackBarService } from 'src/app/core/services/snackBar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [CollapseAnimationFade]
})
export class AuthComponent implements OnInit {
  authForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    surname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    repeatPassword: ['']
  });

  private _authMode!: 'login' | 'signup';

  constructor (private _auth: AuthService, private _route: ActivatedRoute, private _router: Router, private _fb: FormBuilder, private _snackBar: SnackBarService) { }

  ngOnInit(): void {
    let mode: string | null = this._route.snapshot.paramMap.get('mode');

    if (mode == 'login' || mode == 'signup') {
      this._authMode = mode;
      return;
    }

    this._router.navigate(['auth/signup']);
    this._authMode = 'signup';
  }

  getMode(): 'login' | 'signup'{
    return this._authMode;
  }

  setMode(mode: 'login' | 'signup'): void {
    this._authMode = mode;
  }

  onSubmit(): void {
    if (!this.authForm.get('username')?.valid){
      this._snackBar.displayMessage("Invalid username");
      return;
    } else if (!this.authForm.get('password')?.valid){
      this._snackBar.displayMessage("Invalid password");
      return;
    }

    if (this.getMode() === "signup"){
      if (!this.authForm.get('name')?.valid){
        this._snackBar.displayMessage("Invalid name");
        return;
      } else if (!this.authForm.get('surname')?.valid){
        this._snackBar.displayMessage("Invalid surname");
        return;
      } else if (!this.authForm.get('email')?.valid){
        this._snackBar.displayMessage("Invalid email");
        return;
      } else if (this.authForm.get('password')?.value != this.authForm.get('repeatPassword')?.value){
        this._snackBar.displayMessage("Passwords don't match");
        return;
      }

      this._auth.register({
        login: this.authForm.value?.username,
        firstName: this.authForm.value?.name,
        lastName: this.authForm.value?.surname,
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
}
