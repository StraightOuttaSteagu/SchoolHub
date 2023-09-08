import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AccountService } from "./account.service";
import { GetAccount, UpdateAccount } from "./account.actions";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { accountModel } from "../models";

export interface AccountStateModel {
    account: accountModel
}

@State<AccountStateModel>({
    name: 'accountstate',
    defaults: {
        account: {
            email: '',
            firstName: '',
            lastName: '',
            login: ''
        }
    }
})
@Injectable()
export class AccountState {
    
    constructor (private _accountService: AccountService) { }

    @Selector()
    static selectAccount(state: AccountStateModel) {
        return state.account;
    }

    @Action(GetAccount)
    getAccount(ctx: StateContext<AccountStateModel>) {
        return this._accountService.getAccount().pipe(tap((account: accountModel) => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                account: account
            });
        }));
    }

    @Action(UpdateAccount)
    updateAccount(ctx: StateContext<AccountStateModel>, { payload }: UpdateAccount) {
        return this._accountService.updateAccount(payload).pipe(tap((x) => {
            console.log(x)
        }));
    }
}