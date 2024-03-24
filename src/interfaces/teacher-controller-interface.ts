import { Request, Response, NextFunction } from 'express';

export interface TeacherControllerInterface {
    createTeacher(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    getTeacherById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    getTeachers(req: Request, res: Response, next: NextFunction): Promise<void>;

    updateTeacher(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    deleteTeacher(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
}
