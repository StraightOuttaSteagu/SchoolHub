import { AccountModel } from "../models";

export class GetAccount {
    static readonly type = '[Account] Get';
}

export class UpdateAccount {
    static readonly type = '[Account] Update';
    constructor (public payload: AccountModel) { }
}