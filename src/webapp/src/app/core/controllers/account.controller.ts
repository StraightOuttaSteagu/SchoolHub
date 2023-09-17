import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountModel } from "../state-management/models";

@Injectable({
    providedIn: 'root'
})
export class AccountController {
    constructor (private _http: HttpClient) { }

    getAccount(): Observable<any> {
        return this._http.get<AccountModel>('http://localhost:8080/api/account');
    }

    updateAccount(payload: AccountModel): Observable<any> {
        return this._http.post('http://localhost:8080/api/account', payload);
    }
}