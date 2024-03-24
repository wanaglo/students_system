import { Request, Response, NextFunction } from 'express';

export interface GradeControllerInterface {
    createGrade(req: Request, res: Response, next: NextFunction): Promise<void>;

    getGradeById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    getGrades(req: Request, res: Response, next: NextFunction): Promise<void>;

    updateGrade(req: Request, res: Response, next: NextFunction): Promise<void>;

    deleteGrade(req: Request, res: Response, next: NextFunction): Promise<void>;
}
