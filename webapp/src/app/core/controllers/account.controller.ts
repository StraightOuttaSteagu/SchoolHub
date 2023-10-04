import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountLoginModel, AccountModel, AccountRegisterModel } from "../state-management/models";
import { baseURL } from "../baseURL";

@Injectable({
    providedIn: 'root'
})
export class AccountController {
    constructor (private _http: HttpClient) { }

    cookies(): Observable<any> {
        return this._http.get(`${baseURL}/sanctum/csrf-cookie`);
    }

    login(payload: AccountLoginModel): Observable<any> {
        return this._http.post(`${baseURL}/api/login`, payload);
    }

    register(payload: AccountRegisterModel): Observable<any> {
        return this._http.post(`${baseURL}/register`, payload);
    }

    logout(): Observable<any> {
        localStorage.removeItem("token");
        return this._http.post(`${baseURL}/logout`, {});
    }

    getAccount(): Observable<any> {
        return this._http.get<AccountModel>(`${baseURL}/api/user`);
    }

    updateAccount(payload: AccountModel): Observable<any> {
        return this._http.post(`${baseURL}/api/user`, payload);
    }
}