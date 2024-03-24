import { Router } from 'express';
import gradeCreateValidation from '../middlewares/create-grade-validation';
import gradeUpdateValidation from '../middlewares/update-grade-validation';
import gradeController from '../controllers/grade-controller';

export const gradeRouter = Router();

gradeRouter.post('/grade', gradeCreateValidation, gradeController.createGrade);

gradeRouter.get('/grade/:id', gradeController.getGradeById);

gradeRouter.get('/grade', gradeController.getGrades);

gradeRouter.put('/grade', gradeUpdateValidation, gradeController.updateGrade);

gradeRouter.delete('/grade/:id', gradeController.deleteGrade);
