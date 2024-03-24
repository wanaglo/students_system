import { QueryResult } from 'pg';

export interface DisciplineRepositoryInterface {
    createSubject(
        subjectName: string,
        teacherId: number
    ): Promise<QueryResult<any>>;

    getSubjectById(id: number): Promise<QueryResult<any>>;

    getSubjects(): Promise<QueryResult<any[]>>;

    updateSubject(
        id: number,
        subject: string,
        teacherId: number
    ): Promise<QueryResult<any>>;

    deleteSubject(id: number): Promise<void>;
}
