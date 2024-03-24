export class ApiError extends Error {
    private _status: number;
    private _errors: any[];

    private constructor(message: string, status: number, errors: any[] = []) {
        super(message);
        this._status = status;
        this._errors = errors;
    }

    public get status(): number {
        return this._status;
    }

    public get errors(): any[] {
        return this._errors;
    }

    public static BadRequestError(message: string, errors: any[] = []) {
        return new ApiError(message, 400, errors);
    }
}
