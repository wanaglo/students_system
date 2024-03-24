import { body } from 'express-validator';

export default [
    body('lastName', 'Фамилия не может быть пустым').trim().notEmpty(),
    body('firstName', 'Имя не может быть пустым').trim().notEmpty(),
    body('fatherName', 'Отчество не может быть пустым').trim().notEmpty(),
];
