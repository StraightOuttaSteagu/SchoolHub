export class GetGradesByOrganization {
    static readonly type = '[Grades] GetOrg';
    constructor (public id: number) { }
}

export class GetAbsencesByOrganization {
    static readonly type = '[Absences] GetOrg';
    constructor (public id: number) { }
}

export class GetAnnouncementsByOrganization {
    static readonly type = '[Announcements] GetOrg';
    constructor (public id: number) { }
}

export class GetAssignmentsByOrganization {
    static readonly type = '[Assignments] GetOrg';
    constructor (public id: number) { }
}