import { ErrorResponse } from '../types/types';
import { HTTP_STATUS, SERVER_ERRORS } from './sendMessages';
import { buildResponse } from './buildResponse';
import { Response } from 'express';

const sendHandler = (res: Response, status: number, message: string, data?: any): Response => {
    const resp = buildResponse(status, message, data);
    return res.status(resp.status).json(resp);
};

export const Send = {

    sendBadRequest(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.BAD_REQUEST, message || 'Requisição inválida', data);
    },
    sendUnauthorized(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.UNAUTHORIZED, message || 'Não autorizado', data);
    },
    sendForbidden(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.FORBIDDEN, message || 'Acesso negado', data);
    },
    sendNotFound(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.NOT_FOUND, message || 'Recurso não encontrado', data);
    },
    sendInternalServerError(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, message || 'Erro interno do servidor', data);
    },
    sendConflict(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.CONFLICT, message || 'Conflito no recurso', data);
    },
    sendUnprocessableEntity(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, message || 'Entidade não processável', data);
    },
    sendSuccess(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.OK, message || 'Sucesso', data);
    },
    sendCreated(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.CREATED, message || 'Recurso criado com sucesso', data);
    },
    sendAccepted(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.ACCEPTED, message || 'Requisição aceita', data);
    },
    sendNoContent(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.NO_CONTENT, message || 'Sem conteúdo', data);
    },
    sendBadGateway(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.BAD_GATEWAY, message || 'Gateway ruim', data);
    },
    sendServiceUnavailable(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.SERVICE_UNAVAILABLE, message || 'Serviço indisponível', data);
    },
    sendServerError(res: Response, message?: string, data?: any) {
        return sendHandler(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, message || 'Erro interno do servidor', data);
    }
}
