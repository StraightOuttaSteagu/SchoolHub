import { ClassModel } from "../models";

export class GetClass {
    static readonly type = '[Class] Get';
    constructor (public id: string) { }
}

export class GetClasses {
    static readonly type = '[Class] Get';
    constructor (public organizationId: string) { }
}

export class UpdateClass {
    static readonly type = '[Class] Update';
    constructor (public payload: ClassModel) { }
}

export class CreateClass {
    static readonly type = '[Class] Create';
    constructor (public payload: ClassModel) { }
}

export class DeleteClass {
    static readonly type = '[Class] Delete';
    constructor (public id: string) { }
}