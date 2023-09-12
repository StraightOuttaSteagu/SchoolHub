import { OrganizationModel } from "../models";

export class GetOrganization {
    static readonly type = '[Organization] Get';
    constructor (public id: number) { }
}

export class GetOrganizations {
    static readonly type = '[Organizations] Get';
    constructor () { }
}

export class UpdateOrganization {
    static readonly type = '[Organization] Update';
    constructor (public payload: OrganizationModel, public id: number) { }
}

export class CreateOrganization {
    static readonly type = '[Organization] Create';
    constructor (public payload: OrganizationModel) { }
}

export class DeleteOrganization {
    static readonly type = '[Organization] Delete';
    constructor (public id: number) { }
}

export class SetOrganization {
    static readonly type = '[Organization] Set';
    constructor (public organization: OrganizationModel) { }
}