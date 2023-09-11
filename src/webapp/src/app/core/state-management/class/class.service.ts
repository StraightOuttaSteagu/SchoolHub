import { Injectable } from '@angular/core';
import { ClassModel } from '../models';
import { Store } from '@ngxs/store';
import { CreateClass, GetClass, GetClasses, UpdateClass } from './class.actions';
import { DeleteOrganization } from '../organization/organization.actions';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor (private _store: Store) { }

    getClasses(organizationId: string): void {
        this._store.dispatch(new GetClasses(organizationId));
    }

    getClassById(id: string): void {
        this._store.dispatch(new GetClass(id));
    }

    updateOrganization(payload: ClassModel): void {
        this._store.dispatch(new UpdateClass(payload));
    }

    createOrganization(payload: ClassModel) {
        this._store.dispatch(new CreateClass(payload));
    }

    DeleteOrganization(id: string) {
        this._store.dispatch(new DeleteOrganization(id));
    }
}