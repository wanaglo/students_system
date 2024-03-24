import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exeptions/api-error';

export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(err);

    if (err instanceof ApiError) {
        res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        });
    } else {
        res.status(500).json({ message: 'Произошла непредвиденная ошибка' });
    }
}
