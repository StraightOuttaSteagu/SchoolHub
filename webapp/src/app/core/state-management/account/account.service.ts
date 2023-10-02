import { Injectable } from '@angular/core';
import { AccountModel } from '../models';
import { Store } from '@ngxs/store';
import { GetAccount, RemoveAccount, UpdateAccount } from './account.actions';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor (private _store: Store) { }

    getAccount(): void {
        this._store.dispatch(new GetAccount());
    }

    updateAccount(payload: AccountModel): void {
        this._store.dispatch(new UpdateAccount(payload));
    }

    register(): void {

    }

    login(): void {
        
    }

    removeAccount(): void {
        this._store.dispatch(new RemoveAccount());
    }
}