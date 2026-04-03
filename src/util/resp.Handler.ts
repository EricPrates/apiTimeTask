import {ErrorResponse} from '../types/types';
import { HTTP_STATUS, SERVER_ERRORS } from '../GlobalErrors';
import { padronizedResp } from '../controller/util';
import { Response } from 'express';
export function sendHandler(res: Response, status: number, message: string, details?: any) : Response {
    const resp = padronizedResp(status, message, details);
    return res.status(resp.status).json(resp);
}

export const sendBadRequest = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.BAD_REQUEST, message, details);
};
export const sendUnauthorized = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.UNAUTHORIZED, message, details);
}
export const sendForbidden = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.FORBIDDEN, message, details);
}
export const sendNotFound = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.NOT_FOUND, message, details);
}
export const sendInternalServerError = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, message, details);
}
export const sendConflict = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.CONFLICT, message, details);
}
export const sendUnprocessableEntity = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, message, details);
}
export const sendSuccess = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.OK, message, details);
}
export const sendCreated = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.CREATED, message, details);
}
export const sendAccepted = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.ACCEPTED, message, details);
}
export const sendNoContent = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.NO_CONTENT, message, details);
}
export const sendBadGateway = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.BAD_GATEWAY, message, details);
}
export const sendServiceUnavailable = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.SERVICE_UNAVAILABLE, message, details);
}
export const sendServerError = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, message, details);
}
export const ServiceUnavailable = (res: Response, message: string, details?: any) => {
    return sendHandler(res, HTTP_STATUS.SERVICE_UNAVAILABLE, message, details);
}