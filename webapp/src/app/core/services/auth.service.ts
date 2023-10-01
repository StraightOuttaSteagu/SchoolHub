import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from './SnackBar.service';
import { baseURL } from '../baseURL';
import { AccountLoginModel, AccountRegisterModel } from '../state-management/models';
import { AccountController } from '../controllers/account.controller';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router, private _snackBar: SnackBarService, private _accountController: AccountController) { }

  login(form: AccountLoginModel): void {
    this._accountController.cookies().subscribe({
      next: () => {
        this._accountController.login(form).subscribe({
          next: () => {
            this._router.navigate(["announcements"])
          },
          error: (e) => {
            this._snackBar.displayMessage(e.statusText);
          }
        });
      },
      error: () => {
        this._snackBar.displayMessage('Cookie error');
      }
    });
  }

  register(form: AccountRegisterModel): void {
    this._accountController.cookies().subscribe({
      next: () => {
        this._accountController.register(form).subscribe({
          next: () => {
            this._router.navigate(["announcements"]);
          },
          error: (e) => {
            this._snackBar.displayMessage(e.statusText);
          }
        });
      },
      error: () => {
        this._snackBar.displayMessage('Cookie error');
      }
    });
  }

  isLoggedIn(): boolean {
    return true;
  }

  logout(): void {
    this._accountController.cookies().subscribe({
        next: () => {
          this._accountController.logout().subscribe({
            next: () => {
              this._router.navigate(["auth"]);
            },
            error: (e) => {
              this._snackBar.displayMessage(e.statusText);
            }
          });
        },
        error: () => {
          this._snackBar.displayMessage('Cookie error');
        }
    });
  }
}
