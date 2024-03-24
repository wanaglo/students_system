export interface GradeServiceInterface {
    createGrade(
        studentId: number,
        subjectId: number,
        grade: number | null
    ): Promise<any>;

    getGradeById(id: number): Promise<any>;

    getGrades(): Promise<any[]>;

    updateGrade(
        id: number,
        studentId: number,
        subjectId: number,
        grade: number | null
    ): Promise<any>;

    deleteGrade(id: number): Promise<void>;
}
