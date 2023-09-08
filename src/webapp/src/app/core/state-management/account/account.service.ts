import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { accountModel } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor (private _http: HttpClient) { }

    getAccount(): Observable<any> {
        return this._http.get<accountModel>('http://localhost:8080/api/account');
    }

    updateAccount(payload: accountModel): Observable<any> {
        return this._http.post('http://localhost:8080/api/account', payload);
    }
}