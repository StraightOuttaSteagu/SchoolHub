import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from './snackBar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router, private _snackBar: SnackBarService) { }

  login(form: object): void {
    this._http.post('http://localhost:8080/api/authenticate', form).subscribe({
      next: (val: any) => {
        localStorage.setItem('token', val.id_token);
        this._snackBar.displayMessage("Login succesful");
        this._router.navigate(['announcements']);
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
    this._http.post('http://localhost:8080/api/register', form).subscribe({
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
    return localStorage.getItem('token') != undefined;
  }

  logOut(): void {
    localStorage.removeItem('token');
  }
}
