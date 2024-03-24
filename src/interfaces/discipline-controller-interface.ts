import { Request, Response, NextFunction } from 'express';

export interface DisciplineControllerInterface {
    createSubject(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    getSubjectById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    getSubjects(req: Request, res: Response, next: NextFunction): Promise<void>;

    updateSubject(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    deleteSubject(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
}
