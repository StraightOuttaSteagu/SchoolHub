import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetAccount, UpdateAccount } from "./account.actions";
import { Injectable } from "@angular/core";
import { AccountModel } from "../models";
import { AccountController } from "../../controllers/account.controller";

export interface AccountStateModel {
    account: AccountModel
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
    
    constructor (private _accountController: AccountController) { }

    @Selector()
    static selectAccount(state: AccountStateModel) {
        return state.account;
    }

    @Action(GetAccount)
    getAccount(ctx: StateContext<AccountStateModel>) {
        return this._accountController.getAccount().subscribe({
            next: (account: AccountModel) => {

                ctx.setState({
                    account
                });
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(UpdateAccount)
    updateAccount(ctx: StateContext<AccountStateModel>, action: UpdateAccount) {
        return this._accountController.updateAccount(action.payload).subscribe({
            next: (val) => {
                ctx.setState({
                    account: action.payload
                });
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
}