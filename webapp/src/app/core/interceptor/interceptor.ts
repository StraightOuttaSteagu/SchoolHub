import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpXsrfTokenExtractor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from '../state-management/account/account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  headerName = 'X-XSRF-TOKEN';

  constructor(private tokenService: HttpXsrfTokenExtractor, private _router: Router, private _accountService: AccountService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({ withCredentials: true });

    if (!(req.method === 'GET' || req.method === 'HEAD')) {
      const token = this.tokenService.getToken();

      if (token !== null && !req.headers.has(this.headerName)) {
        req = req.clone({headers: req.headers.set(this.headerName, token)});
      }
    }

    return next.handle(req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })).pipe(
      map((event: HttpEvent<any>) => {
          return event;
      }),
      catchError((error: any) => {
          if (error.status === 401 && !this._router.url.includes('auth')) {
              this._router.navigate(['/auth']);
              this._accountService.removeAccount();
              return of(error);
          }
          return throwError(error);
      })
  );
  }
}