import { Request, Response, NextFunction } from 'express';

export interface StudentControllerInterface {
    createStudent(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    getStudentById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    getStudents(req: Request, res: Response, next: NextFunction): Promise<void>;

    updateStudent(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    deleteStudent(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
}
