export interface DisciplineServiceInterface {
    createSubject(subjectName: string, teacherId: number): Promise<any>;

    getSubjectById(id: number): Promise<any>;

    getSubjects(): Promise<any[]>;

    updateSubject(id: number, subject: string, teacherId: number): Promise<any>;

    deleteSubject(id: number): Promise<void>;
}
