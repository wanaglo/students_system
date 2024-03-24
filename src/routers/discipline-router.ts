import { Router } from 'express';
import disciplineCreateValidation from '../middlewares/create-discipline-validation-middleware';
import disciplineUpdateValidation from '../middlewares/update-discipline-validation-middleware';
import disciplineController from '../controllers/discipline-controller';

export const disciplineRouter = Router();

disciplineRouter.post(
    '/discipline',
    disciplineCreateValidation,
    disciplineController.createSubject
);

disciplineRouter.get('/discipline/:id', disciplineController.getSubjectById);

disciplineRouter.get('/discipline', disciplineController.getSubjects);

disciplineRouter.put(
    '/discipline',
    disciplineUpdateValidation,
    disciplineController.updateSubject
);

disciplineRouter.delete('/discipline/:id', disciplineController.deleteSubject);
