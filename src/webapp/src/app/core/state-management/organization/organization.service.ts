import { Injectable } from '@angular/core';
import { AccountModel, OrganizationModel } from '../models';
import { Store } from '@ngxs/store';
import { GetOrganizations, UpdateOrganization, CreateOrganization, GetOrganization, DeleteOrganization, SetOrganization } from './organization.actions';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor (private _store: Store) { }

    getOrganizations(): void {
        this._store.dispatch(new GetOrganizations());
    }

    getOrganization(id: number): void {
        this._store.dispatch(new GetOrganization(id));
    }

    updateOrganization(payload: OrganizationModel, id: number): void {
        this._store.dispatch(new UpdateOrganization(payload, id));
    }

    createOrganization(payload: OrganizationModel): void {
        this._store.dispatch(new CreateOrganization(payload));
    }

    setOrganization(organization: OrganizationModel): void {
        localStorage.setItem('activeOrganization', (organization.id as string));

        this._store.dispatch(new SetOrganization(organization));
    }

    //deleteOrganization(id: number): void {
    //    this._store.dispatch(new DeleteOrganization(id));
    //}


}