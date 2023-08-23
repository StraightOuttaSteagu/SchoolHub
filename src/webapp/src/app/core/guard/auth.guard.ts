import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor (private _router: Router, private _auth: AuthService) { }

  canActivate() {
    if (this._auth.isLoggedIn()){
      return true;
    }

    this._router.navigate(['auth']);

    return false;
  }
}