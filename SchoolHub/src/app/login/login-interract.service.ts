import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginInterractService {
  authMode: 'login' | 'signup' = 'login';

  constructor() { }
}