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
        //return this._http.get<AccountModel>('http://localhost:8080/api/account');
    }

    getClasses(organizationId: string): Observable<any> {
        //return this._http.post('http://localhost:8080/api/account', payload);
    }

    createClass(payload: ClassModel): Observable<any> {

    }

    updateClass(payload: ClassModel): Observable<any> {

    }

    deleteClass(id: string): Observable<any> {
        
    }
}