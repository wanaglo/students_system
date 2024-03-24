import { ApiError } from '../exeptions/api-error';
import { TeacherRepositoryInterface } from '../interfaces/teacher-repository-interface';
import { TeacherServiceInterface } from '../interfaces/teacher-service-interface';
import teacherPgRepository from '../repositories/teacher-pg-repository';

class TeacherService implements TeacherServiceInterface {
    teacherRepository: TeacherRepositoryInterface;

    constructor(teacherRepository: TeacherRepositoryInterface) {
        this.teacherRepository = teacherRepository;
    }

    public async createTeacher(
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<any> {
        const teacher = await this.teacherRepository.createTeacher(
            lastName,
            firstName,
            fatherName
        );

        return teacher.rows[0];
    }

    public async getTeacherById(id: number): Promise<any> {
        const teacher = await this.teacherRepository.getTeacherById(id);

        if (!teacher.rows[0]) {
            throw ApiError.BadRequestError('Преподаватель не найден');
        }

        return teacher.rows[0];
    }

    public async getTeachers(): Promise<any[]> {
        const teachers = await this.teacherRepository.getTeachers();

        return teachers.rows;
    }

    public async updateTeacher(
        id: number,
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<any> {
        const teacher = await this.teacherRepository.getTeacherById(id);

        if (!teacher.rows[0]) {
            throw ApiError.BadRequestError('Преподаватель не найден');
        }

        const updatedTeacher = await this.teacherRepository.updateTeacher(
            id,
            lastName,
            firstName,
            fatherName
        );

        return updatedTeacher.rows[0];
    }

    public async deleteTeacher(id: number): Promise<void> {
        const teacher = await this.teacherRepository.getTeacherById(id);

        if (!teacher.rows[0]) {
            throw ApiError.BadRequestError('Преподаватель не найден');
        }

        await this.teacherRepository.deleteTeacher(id);
    }
}

export default new TeacherService(teacherPgRepository);
