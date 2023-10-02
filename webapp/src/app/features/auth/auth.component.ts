import { Component, OnInit, ViewChild  } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CollapseAnimationFade } from 'src/app/shared/animations';
import { SnackBarService } from 'src/app/core/services/SnackBar.service';
import { IonCheckbox } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [CollapseAnimationFade]
})
export class AuthComponent implements OnInit {

  @ViewChild('isParent') private _isParent!: IonCheckbox;

  authForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    surname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    repeatPassword: [''],
    parent: ['false']
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
    if (!this.authForm.get('email')?.valid){
      return this._snackBar.displayMessage("Invalid email");
    }
    
    if (!this.authForm.get('password')?.valid){
      return this._snackBar.displayMessage("Invalid password");
    }

    if (this.getMode() === "signup"){
      if (!this.authForm.get('name')?.valid){
        return this._snackBar.displayMessage("Invalid name");
      }
      
      if (!this.authForm.get('surname')?.valid){
        return this._snackBar.displayMessage("Invalid surname");
      }

      if (!this.authForm.get('username')?.valid){
        return this._snackBar.displayMessage("Invalid username");
      }
      
      if (this.authForm.get('password')?.value != this.authForm.get('repeatPassword')?.value){
        return this._snackBar.displayMessage("Passwords don't match");
      }

      return this._auth.register({
        username: this.authForm.value?.username,
        name: this.authForm.value?.name + ' ' + this.authForm.value?.surname,
        email: this.authForm.value?.email,
        password: this.authForm.value?.password,
        password_confirmation: this.authForm.value?.repeatPassword,
        parent: this._isParent.checked
      });

    }

    this._auth.login({
      email: this.authForm.value?.email,
      password: this.authForm.value?.password
    });
  }
}
