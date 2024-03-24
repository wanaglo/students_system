import { ApiError } from '../exeptions/api-error';
import { DisciplineRepositoryInterface } from '../interfaces/discipline-repository-interface';
import { DisciplineServiceInterface } from '../interfaces/discipline-service-interface';
import disciplinePgRepository from '../repositories/discipline-pg-repository';
import teacherService from './teacher-service';

class DisciplineService implements DisciplineServiceInterface {
    disciplineRepository: DisciplineRepositoryInterface;

    constructor(disciplineRepository: DisciplineRepositoryInterface) {
        this.disciplineRepository = disciplineRepository;
    }

    public async createSubject(
        subjectName: string,
        teacherId: number
    ): Promise<any> {
        await teacherService.getTeacherById(teacherId);

        const subject = await this.disciplineRepository.createSubject(
            subjectName,
            teacherId
        );

        return subject.rows[0];
    }
    public async getSubjectById(id: number): Promise<any> {
        const subject = await this.disciplineRepository.getSubjectById(id);

        if (!subject.rows[0]) {
            throw ApiError.BadRequestError('Предмет не найден');
        }

        return subject.rows[0];
    }
    public async getSubjects(): Promise<any[]> {
        const subjects = await this.disciplineRepository.getSubjects();

        return subjects.rows;
    }
    public async updateSubject(
        id: number,
        subjectName: string,
        teacherId: number
    ): Promise<any> {
        const subject = await this.disciplineRepository.getSubjectById(id);

        if (!subject.rows[0]) {
            throw ApiError.BadRequestError('Предмет не найден');
        }

        await teacherService.getTeacherById(teacherId);

        const updatedSubject = await this.disciplineRepository.updateSubject(
            id,
            subjectName,
            teacherId
        );

        return updatedSubject.rows[0];
    }
    public async deleteSubject(id: number): Promise<void> {
        const subject = await this.disciplineRepository.getSubjectById(id);

        if (!subject.rows[0]) {
            throw ApiError.BadRequestError('Предмет не найден');
        }

        await this.disciplineRepository.deleteSubject(id);
    }
}

export default new DisciplineService(disciplinePgRepository);
