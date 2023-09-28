import { Injectable } from "@angular/core";
import { GetAbsencesByOrganization, GetAnnouncementsByOrganization, GetAssignmentsByOrganization, GetGradesByOrganization } from "./dashboard.actions";
import { Store } from "@ngxs/store";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor (private _store: Store) { }

    getGradesByOrganization(id: number): void {
        this._store.dispatch(new GetGradesByOrganization(id));
    }

    getAbsencesByOrganization(id: number): void {
        this._store.dispatch(new GetAbsencesByOrganization(id));
    }

    getAnnouncementsByOrganization(id: number): void {
        this._store.dispatch(new GetAnnouncementsByOrganization(id));
    }

    getAssignmentsByOrganization(id: number): void {
        this._store.dispatch(new GetAssignmentsByOrganization(id));
    }
}