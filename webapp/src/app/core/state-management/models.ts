export interface AccountModel {
    id?: string,
    email: string,
    firstName: string,
    lastName: string,
    login: string
}

export interface OrganizationModel {
    id?: string,
    name: string
}

export interface ClassModel {
    id?: string,
    title: string,
    owner: string,
    theme: string,
    icon: string,
    announcements: PostModel[],
    assignments: PostModel[],
    absences: AbsenceModel[],
    grades: GradeModel[]
}

export interface PostModel {
    id?: string,
    title: string,
    content: string,
    date: string,
    dueDate?: string,
    attachments: string[],
    comments: string[],
    subject: string,
    icon: string
}

export interface GradeModel {
    date: string,
    grade: string
}

export interface AbsenceModel {
    date: string,
    excused: boolean
}