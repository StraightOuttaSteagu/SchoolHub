import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from './SnackBar.service';
import { baseURL } from '../baseURL';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router, private _snackBar: SnackBarService) { }

  login(form: any): void {
    this._http.get(baseURL + "/sanctum/csrf-cookie").subscribe({
      next: () => {
        this._http.post(baseURL + "/api/login", {
          email: form["username"],
          password: form["password"]
        }).subscribe({
          next: (resp: any) => {
            localStorage.setItem("token", resp.token!);
            this._router.navigate(["announcements"])
          }
        });
      }
    });
  }

  register(form: {login: string, password: string, firstName: string, lastName: string, email: string}): void {
    this._http.get("http://localhost:8000/sanctum/csrf-cookie").subscribe({
      next: () => {
        this._http.post('http://localhost:8000/register', {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          password: form.password,
          username: form.login,
          password_confirmation: form.password,
          parent: false
        }).subscribe({
          next: () => {
            this._snackBar.displayMessage("Account created successfully");
            console.log("BNNBNBNBNBNBNBNBNBNBNBBBNBNNBBNBN");
            this.login({
              username: form.email,
              password: form.password,
              rememberMe: true
            });
          },
          error: err => {
            console.log(err, 444)
            this._snackBar.displayMessage(err.statusText);
          }
        });
      }
    })
  }

  isLoggedIn(): boolean {
    return true;
  }

  logOut(): void {
    localStorage.removeItem("token");
  }
}
