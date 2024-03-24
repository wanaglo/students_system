import { ApiError } from '../exeptions/api-error';
import { StudentRepositoryInterface } from '../interfaces/student-repository-interface';
import { StudentServiceInterface } from '../interfaces/student-service-interface';
import studentPgRepository from '../repositories/student-pg-repository';

class StudentService implements StudentServiceInterface {
    private studentRepository: StudentRepositoryInterface;

    constructor(studentRepository: StudentRepositoryInterface) {
        this.studentRepository = studentRepository;
    }

    public async createStudent(
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<any> {
        const student = await this.studentRepository.createStudent(
            lastName,
            firstName,
            fatherName
        );

        return student.rows[0];
    }

    public async getStudentById(id: number): Promise<any> {
        const student = await this.studentRepository.getStudentById(id);

        if (!student.rows[0]) {
            throw ApiError.BadRequestError('Студент не найден');
        }

        return student.rows[0];
    }

    public async getStudents(): Promise<any[]> {
        const students = await this.studentRepository.getStudents();

        return students.rows;
    }

    public async updateStudent(
        id: number,
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<any> {
        const student = await this.studentRepository.getStudentById(id);

        if (!student.rows[0]) {
            throw ApiError.BadRequestError('Студент не найден');
        }

        const updatedStudent = await studentPgRepository.updateStudent(
            id,
            lastName,
            firstName,
            fatherName
        );

        return updatedStudent.rows[0];
    }

    public async deleteStudent(id: number): Promise<void> {
        const student = await this.studentRepository.getStudentById(id);

        if (!student.rows[0]) {
            throw ApiError.BadRequestError('Студент не найден');
        }

        await this.studentRepository.deleteStudent(id);
    }
}

export default new StudentService(studentPgRepository);
