import { body } from 'express-validator';

export default [
    body('id', 'Id не может быть пустым').trim().notEmpty(),
    body('subjectName', 'Имя предмета не может быть пустым').trim().notEmpty(),
    body('teacherId', 'Id преподавателя не может быть пустым')
        .trim()
        .notEmpty(),
];
