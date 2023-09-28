import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { GetAbsencesByClass, GetAnnouncementsByClass, GetAssignmentsByClass, GetGradesByClass } from "./class-objects.actions";


@Injectable({
    providedIn: 'root'
})
export class ClassObjectsService {
    constructor (private _store: Store) { }

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