import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrganizationModel } from "../state-management/models";

@Injectable({
    providedIn: 'root'
})
export class OrganizationController {
    constructor (private _http: HttpClient) { }

    getOrganization(id: string): Observable<any> {
        //return this._http.get<AccountModel>('http://localhost:8080/api/account');
    }

    getOrganizations(): Observable<any> {
        //return this._http.post('http://localhost:8080/api/account', payload);
    }

    createOrganization(payload: OrganizationModel): Observable<any> {

    }

    updateOrganization(payload: OrganizationModel): Observable<any> {

    }

    deleteOrganization(id: string): Observable<any> {
        
    }
}