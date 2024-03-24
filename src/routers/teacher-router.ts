import { Router } from 'express';
import teacherController from '../controllers/teacher-controller';
import teacherCreateValidation from '../middlewares/create-student-and-teacher-validation-middleware';
import teacherUpdateValidation from '../middlewares/update-student-and-teacher-validation-middleware';

export const teacherRouter = Router();

teacherRouter.post(
    '/teacher',
    teacherCreateValidation,
    teacherController.createTeacher
);

teacherRouter.get('/teacher/:id', teacherController.getTeacherById);

teacherRouter.get('/teacher', teacherController.getTeachers);

teacherRouter.put(
    '/teacher',
    teacherUpdateValidation,
    teacherController.updateTeacher
);

teacherRouter.delete('/teacher/:id', teacherController.deleteTeacher);
