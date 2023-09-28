import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountModel } from "../state-management/models";
import { baseURL } from "../baseURL";

@Injectable({
    providedIn: 'root'
})
export class AccountController {
    constructor (private _http: HttpClient) { }

    getAccount(): Observable<any> {
        return this._http.get<AccountModel>(baseURL + '/api/user');
    }

    updateAccount(payload: AccountModel): Observable<any> {
        return this._http.post('http://localhost:8080/api/account', payload);
    }
}