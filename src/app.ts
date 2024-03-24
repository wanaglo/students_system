import express from 'express';
import { errorMiddleware } from './middlewares/error-middleware';
import { studentRouter } from './routers/student-router';
import { teacherRouter } from './routers/teacher-router';
import { disciplineRouter } from './routers/discipline-router';
import { gradeRouter } from './routers/grade-router';

export const app = express();

app.use(express.json());

app.use('/api', studentRouter);

app.use('/api', teacherRouter);

app.use('/api', disciplineRouter);

app.use('/api', gradeRouter);

app.use(errorMiddleware);
