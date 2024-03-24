import { Request, Response, NextFunction } from 'express';
import { GradeControllerInterface } from '../interfaces/grade-controller-interface';
import { reqGradeModel } from '../interfaces/req-grade-model';
import { validationResult } from 'express-validator';
import { ApiError } from '../exeptions/api-error';
import gradeService from '../services/grade-service';

class GradeController implements GradeControllerInterface {
    public async createGrade(
        req: Request<{}, {}, reqGradeModel>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw ApiError.BadRequestError(
                    'Ошибка при валидации',
                    errors.array()
                );
            }

            const { studentId, subjectId, grade } = req.body;

            const createdGrade = await gradeService.createGrade(
                studentId,
                subjectId,
                grade
            );

            res.json(createdGrade);
        } catch (err) {
            next(err);
        }
    }

    public async getGradeById(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;

            const grade = await gradeService.getGradeById(+id);

            res.json(grade);
        } catch (err) {
            next(err);
        }
    }

    public async getGrades(req: Request, res: Response, next: NextFunction) {
        try {
            const grades = await gradeService.getGrades();

            res.json(grades);
        } catch (err) {
            next(err);
        }
    }

    public async updateGrade(
        req: Request<{}, {}, reqGradeModel>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw ApiError.BadRequestError(
                    'Ошибка при валидации',
                    errors.array()
                );
            }

            const { id, studentId, subjectId, grade } = req.body;

            const updatedGrade = await gradeService.updateGrade(
                id!,
                studentId,
                subjectId,
                grade
            );

            res.json(updatedGrade);
        } catch (err) {
            next(err);
        }
    }

    public async deleteGrade(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;

            await gradeService.deleteGrade(+id);

            res.json({ message: 'Успешно удален' });
        } catch (err) {
            next(err);
        }
    }
}

export default new GradeController();
