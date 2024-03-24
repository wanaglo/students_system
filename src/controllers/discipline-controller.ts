import { Request, Response, NextFunction } from 'express';
import { DisciplineControllerInterface } from '../interfaces/discipline-controller-interface';
import { reqDisciplineModel } from '../interfaces/req-discipline-model';
import { validationResult } from 'express-validator';
import { ApiError } from '../exeptions/api-error';
import disciplineService from '../services/discipline-service';

class DisciplineController implements DisciplineControllerInterface {
    public async createSubject(
        req: Request<{}, {}, reqDisciplineModel>,
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

            const { subjectName, teacherId } = req.body;

            const subject = await disciplineService.createSubject(
                subjectName,
                teacherId
            );

            res.json(subject);
        } catch (err) {
            next(err);
        }
    }

    public async getSubjectById(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;

            const subject = await disciplineService.getSubjectById(+id);

            res.json(subject);
        } catch (err) {
            next(err);
        }
    }

    public async getSubjects(req: Request, res: Response, next: NextFunction) {
        try {
            const subjects = await disciplineService.getSubjects();

            res.json(subjects);
        } catch (err) {
            next(err);
        }
    }

    public async updateSubject(
        req: Request<{}, {}, reqDisciplineModel>,
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

            const { id, subjectName, teacherId } = req.body;

            const updatedSubject = await disciplineService.updateSubject(
                id!,
                subjectName,
                teacherId
            );

            res.json(updatedSubject);
        } catch (err) {
            next(err);
        }
    }

    public async deleteSubject(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;

            await disciplineService.deleteSubject(+id);

            res.json({ message: 'Успешно удален' });
        } catch (err) {
            next(err);
        }
    }
}

export default new DisciplineController();
