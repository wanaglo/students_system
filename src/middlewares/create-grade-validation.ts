import { body } from 'express-validator';

export default [
    body('studentId', 'Id студента не может пустым').trim().notEmpty(),
    body('subjectId', 'Id предмета не может быть пустым').trim().notEmpty(),
];
