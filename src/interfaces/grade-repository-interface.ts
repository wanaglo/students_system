import { QueryResult } from 'pg';

export interface GradeRepositoryInterface {
    createGrade(
        studentId: number,
        subjectId: number,
        grade: number | null
    ): Promise<QueryResult<any>>;

    getGradeById(id: number): Promise<QueryResult<any>>;

    getGrades(): Promise<QueryResult<any[]>>;

    updateGrade(
        id: number,
        studentId: number,
        subjectId: number,
        grade: number | null
    ): Promise<QueryResult<any>>;

    deleteGrade(id: number): Promise<void>;
}
