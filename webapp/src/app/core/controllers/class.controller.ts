import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClassModel } from "../state-management/models";
import { baseURL } from "../baseURL";

@Injectable({
    providedIn: 'root'
})
export class ClassController {
    constructor (private _http: HttpClient) { }

    getClass(organizationId: number, id: number): Observable<any> {
        return this._http.get(`${baseURL}/api/classes/${id}/posts`);
    }

    getClasses(organizationId: number): Observable<any> {
        return this._http.get(`${baseURL}/api/organizations/${organizationId}/classes`);
    }

    createClass(organizationId: number, payload: ClassModel): Observable<any> {
        return this._http.post(`${baseURL}/api/organizations/${organizationId}/classes`, payload);
    }

    updateClass(payload: ClassModel): Observable<any> {
        return this._http.get('http://localhost:8000/api/account');
    }

    deleteClass(id: number): Observable<any> {
        return this._http.get('http://localhost:8000/api/account');
    }
}