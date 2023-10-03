import { ClassModel } from "../models";

export class SetActiveClass {
    static readonly type = '[Class] Set';
    constructor (public id: number) { }
}

export class GetClass {
    static readonly type = '[Class] Get';
    constructor (public organizationId: number, public id: number) { }
}

export class GetClasses {
    static readonly type = '[Classes] Get';
    constructor (public organizationId: number) { }
}

export class UpdateClass {
    static readonly type = '[Class] Update';
    constructor (public payload: ClassModel) { }
}

export class CreateClass {
    static readonly type = '[Class] Create';
    constructor (public organizationId: number, public payload: ClassModel) { }
}

export class DeleteClass {
    static readonly type = '[Class] Delete';
    constructor (public id: number) { }
}