import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import { SnackBarService } from 'src/app/core/services/snackBar.service';
import {AppConfig} from "../../app.config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private _snackBar: SnackBarService) {}

  login(form: object): void {
    this.http.post(`${AppConfig.API_ENDPOINT}/authenticate`, form).subscribe({
      next: (val: any) => {
        localStorage.setItem('token', val.id_token);
        this._snackBar.displayMessage("Login succesful");
        this.router.navigate(['announcements']);
      },
      error: err => {
        if (err.statusText == "Unauthorized"){
          this._snackBar.displayMessage("Invalid email or password");
        } else {
          this._snackBar.displayMessage(err.statusText);
        }
      }
    });
  }

  register(form: {login: string, password: string, firstName: string, lastName: string, email: string}): void {
    this.http.post(`${AppConfig.API_ENDPOINT}/register`, form).subscribe({
      next: () => {
        this._snackBar.displayMessage("Account created successfully");
        this.login({
          username: form.email,
          password: form.password,
          rememberMe: true
        });
      },
      error: err => {
        this._snackBar.displayMessage(err.statusText);
      }
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !=undefined;
  }

  logOut(): void {
    localStorage.removeItem('token');
  }
}
