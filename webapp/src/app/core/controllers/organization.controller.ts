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
        return this._http.get<string[]>(`${baseURL}/api/organizations/${id}`);
    }

    getOrganizations(): Observable<any> {
        return this._http.get<string[]>(`${baseURL}/api/organizations`);
    }

    createOrganization(payload: OrganizationModel): Observable<any> {
        return this._http.post(`${baseURL}/api/organizations`, payload);
    }

    updateOrganization(payload: OrganizationModel, id: number): Observable<any> {
        return this._http.put(`${baseURL}/api/organizations/${id}`, payload)
    }

    getAnnouncementsByOrganization(id: number): Observable<any> {
        return this._http.get(`${baseURL}/api/announcements/${id}`);
    }

    getAssignmentsByOrganization(id: number): Observable<any> {
        return this._http.get(`${baseURL}/api/assignments/${id}`);
    }

    getGradesByOrganization(id: number): Observable<any> {
        return this._http.get(`${baseURL}/api/grades/${id}`);
    }

    getAbsencesByOrganization(id: number): Observable<any> {
        return this._http.get(`${baseURL}/api/absences/${id}`);
    }
}