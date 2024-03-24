export interface TeacherServiceInterface {
    createTeacher(
        firstName: string,
        lastName: string,
        fatherName: string
    ): Promise<any>;

    getTeacherById(id: number): Promise<any>;

    getTeachers(): Promise<any[]>;

    updateTeacher(
        id: number,
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<any>;

    deleteTeacher(id: number): Promise<void>;
}
