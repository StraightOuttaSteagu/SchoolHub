import { Injectable } from '@angular/core';
import { ClassModel } from '../models';
import { Store } from '@ngxs/store';
import { CreateClass, GetClass, GetClasses, UpdateClass } from './class.actions';
import { DeleteOrganization } from '../organization/organization.actions';

@Injectable({
    providedIn: 'root'
})
export class ClassService {

    constructor (private _store: Store) { }

    getClasses(organizationId: string): void {
        this._store.dispatch(new GetClasses(organizationId));
    }

    getClassById(id: string): void {
        this._store.dispatch(new GetClass(id));
    }

    updateClass(payload: ClassModel): void {
        this._store.dispatch(new UpdateClass(payload));
    }

    createClass(payload: ClassModel) {
        this._store.dispatch(new CreateClass(payload));
    }
}