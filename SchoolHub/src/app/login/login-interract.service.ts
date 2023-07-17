import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginInterractService {
  private authMode: 'login' | 'signup' = 'login';

  public setAuthMode(mode: 'login' | 'signup'){
    this.authMode = mode;
  }

  public getAuthMode(){
    return this.authMode;
  }

  constructor() { }
}