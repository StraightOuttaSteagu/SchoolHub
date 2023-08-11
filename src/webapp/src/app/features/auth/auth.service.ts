import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authMode: 'login' | 'signup' = 'signup';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  public setAuthMode(mode: 'login' | 'signup'){
    this.authMode = mode;
  }

  public getAuthMode(){
    return this.authMode;
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      surname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      repeatPassword: ['']
    });
  }

  login(form: object) {
    this.http.post('http://localhost:8080/api/authenticate', form).subscribe({
      next: (val: any) => {
        localStorage.setItem('token', val.id_token);
        this.displayMessage("Login succesful");
        this.router.navigate(['announcements']);
      },
      error: err => {
        if (err.statusText == "Unauthorized"){
          this.displayMessage("Invalid email or password");
        } else {
          this.displayMessage(err.statusText);
        }
      }
    });
  }

  register(form: object) {
    this.http.post('http://localhost:8080/api/register', form).subscribe({
      next: () => {
        this.displayMessage("Account created successfully");
        this.login(form);
      },
      error: err => {
        this.displayMessage(err.statusText);
      }
    });
  }

  displayMessage(message: string) {
    this.openSnackBar(message);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000, // Duration in milliseconds
    });
  }
}