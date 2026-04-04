import { Request, Response, NextFunction } from 'express';
import { AppError } from "../../Models/appError";
import { Send } from "../../util/sendHandler";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        switch (err.statusCode) {
            case 400:
                return Send.sendBadRequest(res, err.message);
            case 401:
                return Send.sendUnauthorized(res, err.message);
            case 403:
                return Send.sendForbidden(res, err.message);
            case 404:
                return Send.sendNotFound(res, err.message);
            case 409:
                return Send.sendConflict(res, err.message);
            case 422:
                return Send.sendUnprocessableEntity(res, err.message);
            default:
                return Send.sendInternalServerError(res, 'Erro interno do servidor');
        }

    }
    Send.sendInternalServerError(res, 'Erro interno do servidor');
}