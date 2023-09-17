import { Injectable } from '@angular/core';
import { AccountModel, OrganizationModel } from '../models';
import { Store } from '@ngxs/store';
import { GetOrganizations, UpdateOrganization, CreateOrganization, GetOrganization, DeleteOrganization } from './organization.actions';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor (private _store: Store) { }

    getOrganizations(): void {
        this._store.dispatch(new GetOrganizations());
    }

    getOrganization(id: string): void {
        this._store.dispatch(new GetOrganization(id));
    }

    updateOrganization(payload: AccountModel): void {
        this._store.dispatch(new UpdateOrganization(payload));
    }

    createOrganization(payload: OrganizationModel): void {
        this._store.dispatch(new CreateOrganization(payload));
    }

    DeleteOrganization(id: string): void {
        this._store.dispatch(new DeleteOrganization(id));
    }
}