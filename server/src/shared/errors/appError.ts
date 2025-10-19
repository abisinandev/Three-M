export default class AppError extends Error {
    // public readonly message: string;
    public readonly statusCode: number;
    public readonly data?: object | undefined;

    constructor(msg: string, statusCode: number, data?: object) {
        super(msg);
        this.statusCode = statusCode;
        this.data = data;

        Error.captureStackTrace(this, this.constructor)
    }
}