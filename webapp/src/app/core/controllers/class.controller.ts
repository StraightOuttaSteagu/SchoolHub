import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClassModel } from "../state-management/models";

@Injectable({
    providedIn: 'root'
})
export class ClassController {
    constructor (private _http: HttpClient) { }

    getClass(id: string): Observable<any> {
        return this._http.get('http://localhost:8080/api/account');
    }

    getClasses(organizationId: string): Observable<any> {
        return this._http.get('http://localhost:8080/api/account');
    }

    createClass(payload: ClassModel): Observable<any> {
        return this._http.get('http://localhost:8080/api/account');
    }

    updateClass(payload: ClassModel): Observable<any> {
        return this._http.get('http://localhost:8080/api/account');
    }

    deleteClass(id: string): Observable<any> {
        return this._http.get('http://localhost:8080/api/account');
    }
}