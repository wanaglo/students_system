export interface StudentServiceInterface {
    createStudent(
        firstName: string,
        lastName: string,
        fatherName: string
    ): Promise<any>;

    getStudentById(id: number): Promise<any>;

    getStudents(): Promise<any[]>;

    updateStudent(
        id: number,
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<any>;

    deleteStudent(id: number): Promise<void>;
}
