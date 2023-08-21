import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor (private _router: Router) { }

  canActivate() {
    if (localStorage.getItem('token') != undefined){
      return true;
    }

    this._router.navigate(['auth']);

    return false;
  }
}