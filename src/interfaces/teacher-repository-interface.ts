import { QueryResult } from 'pg';

export interface TeacherRepositoryInterface {
    createTeacher(
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<QueryResult<any>>;

    getTeacherById(id: number): Promise<QueryResult<any>>;

    getTeachers(): Promise<QueryResult<any[]>>;

    updateTeacher(
        id: number,
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<QueryResult<any>>;

    deleteTeacher(id: number): Promise<void>;
}
