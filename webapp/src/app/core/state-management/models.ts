export interface AccountModel {
    id?: string,
    email: string,
    name: string,
    username: string,
    parent: boolean
}

export interface AccountLoginModel {
    email: string,
    password: string
}

export interface AccountRegisterModel {
    name: string,
    email: string,
    password: string,
    username: string,
    password_confirmation: string,
    parent: boolean
}

export interface OrganizationModel {
    id?: string,
    name: string
}

export interface ClassModel {
    id?: number,
    name: string,
    owner?: string,
    theme: string,
    icon: string,
    announcements?: PostModel[],
    assignments?: PostModel[],
    absences?: AbsenceModel[],
    grades?: GradeModel[],
    subject: string,
    identifier: string
}

export interface PostModel {
    id?: string,
    title: string,
    content: string,
    date: Date,
    dueDate?: Date,
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
