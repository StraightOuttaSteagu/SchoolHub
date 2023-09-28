
export class GetGradesByClass {
    static readonly type = '[Grades] GetClass';
    constructor (public id: number) { }
}

export class GetAbsencesByClass {
    static readonly type = '[Absences] GetClass';
    constructor (public id: number) { }
}

export class GetAnnouncementsByClass {
    static readonly type = '[Announcements] GetClass';
    constructor (public id: number) { }
}

export class GetAssignmentsByClass {
    static readonly type = '[Assignments] GetClass';
    constructor (public id: number) { }
}