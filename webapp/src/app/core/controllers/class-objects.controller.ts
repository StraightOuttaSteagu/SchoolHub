import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseURL } from "../baseURL";

@Injectable({
    providedIn: 'root'
})
export class ClassObjectsController {
    constructor (private _http: HttpClient) { }

    getAnnouncementsByClass(id: number): Observable<any> {
        return this._http.get(`${baseURL}announcements/${id}`);
    }

    getAssignmentsByClass(id: number): Observable<any> {
        return this._http.get(`${baseURL}assignments/${id}`);
    }

    getGradesByClass(id: number): Observable<any> {
        return this._http.get(`${baseURL}grades/${id}`);
    }

    getAbsencesByClass(id: number): Observable<any> {
        return this._http.get(`${baseURL}absences/${id}`);
    }
}