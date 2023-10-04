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
        return this._http.get(`${baseURL}/api/classes/${id}/posts?type=announcement`);
    }

    createAnnouncement(id: number, title: string, content: string): Observable<any> {
        return this._http.post(`${baseURL}/api/classes/${id}/posts`, {
            title,
            content
        });
    }

    getAssignmentsByClass(id: number): Observable<any> {
        return this._http.get(`${baseURL}/api/classes/${id}/posts?type=assignment`);
    }

    createAssignment(id: number, title: string, content: string, deadline: Date): Observable<any> {
        return this._http.post(`${baseURL}/api/classes/${id}/posts`, {
            title,
            content,
            deadline: deadline.toString(),
            type: "assignment"
        });
    }

    getGradesByClass(id: number): Observable<any> {
        return this._http.get(`${baseURL}/api/classes/${id}/grades`);
    }

    getAbsencesByClass(id: number): Observable<any> {
        return this._http.get(`${baseURL}absences/${id}`);
    }
}