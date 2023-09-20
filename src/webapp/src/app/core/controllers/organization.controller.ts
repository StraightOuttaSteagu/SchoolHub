import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrganizationModel } from "../state-management/models";
import { baseURL } from "../baseURL";

@Injectable({
    providedIn: 'root'
})
export class OrganizationController {
    constructor (private _http: HttpClient) { }

    getOrganization(id: number): Observable<any> {
        return this._http.get<string[]>(`${baseURL}organization/${id}`);
    }

    getOrganizations(): Observable<any> {
        console.log(`${baseURL}organization`)
        return this._http.get<string[]>(`${baseURL}organization`);
    }

    createOrganization(payload: OrganizationModel): Observable<any> {
        return this._http.post(`${baseURL}organization`, payload);
    }

    updateOrganization(payload: OrganizationModel, id: number): Observable<any> {
        return this._http.put(`${baseURL}organization/${id}`, payload)
    }

    // deleteOrganization(id: number): Observable<any> {
        
    // }
}