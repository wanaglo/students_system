import { ApiError } from '../exeptions/api-error';
import { GradeRepositoryInterface } from '../interfaces/grade-repository-interface';
import { GradeServiceInterface } from '../interfaces/grade-service-interface';
import gradePgRepository from '../repositories/grade-pg-repository';
import disciplineService from './discipline-service';
import studentService from './student-service';

class GradeService implements GradeServiceInterface {
    gradeRepository: GradeRepositoryInterface;

    constructor(gradeRepository: GradeRepositoryInterface) {
        this.gradeRepository = gradeRepository;
    }

    public async createGrade(
        studentId: number,
        subjectId: number,
        grade: number | null
    ): Promise<any> {
        await studentService.getStudentById(studentId);

        await disciplineService.getSubjectById(subjectId);

        const createdGrade = await this.gradeRepository.createGrade(
            studentId,
            subjectId,
            grade
        );

        return createdGrade.rows[0];
    }

    public async getGradeById(id: number): Promise<any> {
        const grade = await this.gradeRepository.getGradeById(id);

        if (!grade.rows[0]) {
            throw ApiError.BadRequestError('Запись с успеваемостью не найдена');
        }

        return grade.rows[0];
    }

    public async getGrades(): Promise<any[]> {
        const grades = await this.gradeRepository.getGrades();

        return grades.rows;
    }

    public async updateGrade(
        id: number,
        studentId: number,
        subjectId: number,
        grade: number | null
    ): Promise<any> {
        const checkGrade = await this.gradeRepository.getGradeById(id);

        if (!checkGrade.rows[0]) {
            throw ApiError.BadRequestError('Запись с успеваемостью не найдена');
        }

        await studentService.getStudentById(studentId);

        await disciplineService.getSubjectById(subjectId);

        const updatedGrade = await this.gradeRepository.updateGrade(
            id,
            studentId,
            subjectId,
            grade
        );

        return updatedGrade.rows[0];
    }

    public async deleteGrade(id: number): Promise<void> {
        const grade = await this.gradeRepository.getGradeById(id);

        if (!grade.rows[0]) {
            throw ApiError.BadRequestError('Запись с успеваемостью не найдена');
        }

        await this.gradeRepository.deleteGrade(id);
    }
}

export default new GradeService(gradePgRepository);
