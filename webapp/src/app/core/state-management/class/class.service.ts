import { Injectable } from '@angular/core';
import { ClassModel } from '../models';
import { Store } from '@ngxs/store';
import { CreateAnnouncement, CreateAssignment, CreateClass, GetAnnouncements, GetAssignments, GetClass, GetClasses, GetGrades, SetActiveClass, UpdateClass } from './class.actions';

@Injectable({
    providedIn: 'root'
})
export class ClassService {

    constructor (private _store: Store) { }

    getClasses(organizationId: number): void {
        this._store.dispatch(new GetClasses(organizationId));
    }

    getClass(organizationId: number, id: number): void {
        this._store.dispatch(new GetClass(id, organizationId));
    }

    updateClass(payload: ClassModel): void {
        this._store.dispatch(new UpdateClass(payload));
    }

    createClass(organizationId: number, payload: ClassModel) {
        this._store.dispatch(new CreateClass(organizationId, payload));
    }

    setActiveClass(id: number): void {
        this._store.dispatch(new SetActiveClass(id));
    }

    getAnnouncements(id: number): void {
        this._store.dispatch(new GetAnnouncements(id));
    }

    createAnnouncement(id: number, title: string, content: string): void {
        this._store.dispatch(new CreateAnnouncement(id, title, content));
    }

    getAssignments(id: number): void {
        this._store.dispatch(new GetAssignments(id));
    }

    createAssignment(id: number, title: string, content: string, deadline: Date): void {
        this._store.dispatch(new CreateAssignment(id, title, content, deadline));
    }

    getGrades(id: number): void {
        this._store.dispatch(new GetGrades(id));
    }
}
