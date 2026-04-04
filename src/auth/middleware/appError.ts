export class AppError extends Error {
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
    public readonly statusCode: number
    public readonly message: string

    getStatusCode(): number {
        switch (this.statusCode) {
            case 400:
                return 400;
            default:
                return 500;
        }

    }

}