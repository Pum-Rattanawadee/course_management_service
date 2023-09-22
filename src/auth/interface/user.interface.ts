export enum Role {
    Student = 'student',
    Instructor = 'instructor'
}

export type UserInfo = {
    id: string
    username: string
    role: string
}

export interface IAuthenticate {
    readonly user: UserInfo
    readonly token: string
}