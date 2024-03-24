import { Request, Response, NextFunction } from 'express';
import { StudentControllerInterface } from '../interfaces/student-controller-interface';
import { reqStudentAndTeacherModel } from '../interfaces/req-student-and-teacher-model';
import { validationResult } from 'express-validator';
import { ApiError } from '../exeptions/api-error';
import studentService from '../services/student-service';

class StudentController implements StudentControllerInterface {
    public async createStudent(
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

            const student = await studentService.createStudent(
                lastName,
                firstName,
                fatherName
            );

            res.json(student);
        } catch (err) {
            next(err);
        }
    }

    public async getStudentById(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;

            const student = await studentService.getStudentById(+id);

            res.json(student);
        } catch (err) {
            next(err);
        }
    }

    public async getStudents(req: Request, res: Response, next: NextFunction) {
        try {
            const students = await studentService.getStudents();

            res.json(students);
        } catch (err) {
            next(err);
        }
    }

    public async updateStudent(
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

            const updatedStudent = await studentService.updateStudent(
                id!,
                lastName,
                firstName,
                fatherName
            );

            res.json(updatedStudent);
        } catch (err) {
            next(err);
        }
    }

    public async deleteStudent(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;

            await studentService.deleteStudent(+id);

            res.json({ message: 'Успешно удален' });
        } catch (err) {
            next(err);
        }
    }
}

export default new StudentController();
