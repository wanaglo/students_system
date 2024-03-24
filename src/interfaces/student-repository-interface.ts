import { QueryResult } from 'pg';

export interface StudentRepositoryInterface {
    createStudent(
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<QueryResult<any>>;

    getStudentById(id: number): Promise<QueryResult<any>>;

    getStudents(): Promise<QueryResult<any[]>>;

    updateStudent(
        id: number,
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<QueryResult<any>>;

    deleteStudent(id: number): Promise<void>;
}
