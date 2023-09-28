import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { GetAbsencesByClass, GetAbsencesByOrganization, GetAnnouncementsByClass, GetAnnouncementsByOrganization, GetAssignmentsByClass, GetAssignmentsByOrganization, GetGradesByClass, GetGradesByOrganization } from "./class-objects.actions";


@Injectable({
    providedIn: 'root'
})
export class ClassObjectsService {
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

    getGradesByClass(id: number): void {
        this._store.dispatch(new GetGradesByClass(id));
    }

    getAbsencesByClass(id: number): void {
        this._store.dispatch(new GetAbsencesByClass(id));
    }

    getAnnouncementsByClass(id: number): void {
        this._store.dispatch(new GetAnnouncementsByClass(id));
    }

    getAssignmentsByClass(id: number): void {
        this._store.dispatch(new GetAssignmentsByClass(id));
    }
}