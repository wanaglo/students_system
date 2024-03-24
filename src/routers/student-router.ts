import { Router } from 'express';
import studentController from '../controllers/student-controller';
import studentCreateValidation from '../middlewares/create-student-and-teacher-validation-middleware';
import studentUpdateValidation from '../middlewares/update-student-and-teacher-validation-middleware';

export const studentRouter = Router();

studentRouter.post(
    '/student',
    studentCreateValidation,
    studentController.createStudent
);

studentRouter.get('/student/:id', studentController.getStudentById);

studentRouter.get('/student', studentController.getStudents);

studentRouter.put(
    '/student',
    studentUpdateValidation,
    studentController.updateStudent
);

studentRouter.delete('/student/:id', studentController.deleteStudent);
