import { Request, Response, NextFunction } from 'express';
import { TeacherControllerInterface } from '../interfaces/teacher-controller-interface';
import { reqStudentAndTeacherModel } from '../interfaces/req-student-and-teacher-model';
import { validationResult } from 'express-validator';
import { ApiError } from '../exeptions/api-error';
import teacherService from '../services/teacher-service';

class TeacherController implements TeacherControllerInterface {
    public async createTeacher(
        req: Request<{}, {}, reqStudentAndTeacherModel>,
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

            const { lastName, firstName, fatherName } = req.body;

            const teacher = await teacherService.createTeacher(
                lastName,
                firstName,
                fatherName
            );

            res.json(teacher);
        } catch (err) {
            next(err);
        }
    }

    public async getTeacherById(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;

            const teacher = await teacherService.getTeacherById(+id);

            res.json(teacher);
        } catch (err) {
            next(err);
        }
    }

    public async getTeachers(req: Request, res: Response, next: NextFunction) {
        try {
            const teachers = await teacherService.getTeachers();

            res.json(teachers);
        } catch (err) {
            next(err);
        }
    }

    public async updateTeacher(
        req: Request<{}, {}, reqStudentAndTeacherModel>,
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

            const { id, lastName, firstName, fatherName } = req.body;

            const updatedTeacher = await teacherService.updateTeacher(
                id!,
                lastName,
                firstName,
                fatherName
            );

            res.json(updatedTeacher);
        } catch (err) {
            next(err);
        }
    }

    public async deleteTeacher(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;

            await teacherService.deleteTeacher(+id);

            res.json({ message: 'Успешно удален' });
        } catch (err) {
            next(err);
        }
    }
}

export default new TeacherController();
