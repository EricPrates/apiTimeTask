
import { NextFunction } from "express";
import { AuthRequest, TokenPayload } from "../../types/types";
import { Response } from "express";
import { verifyToken } from "./verifyToken";
import { HTTP_STATUS, AUTH_ERRORS, SERVER_ERRORS } from "../../util/sendMessages";
import { Send } from "../../util/sendHandler";
import { buildResponse } from '../../util/buildResponse';
import { authStorage } from "../../util/authStorage";

export async function adminProcessToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response> {
    const context = authStorage.getStore();
    if (!context || context.role !== 'admin') {
        return Send.sendForbidden(res,);
    }
    return next();
}
export async function processToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response> {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return Send.sendUnauthorized(res, AUTH_ERRORS.NO_TOKEN);
        }
        const partsAuthHeader = authHeader.split(' ');
        if (partsAuthHeader[0] !== 'Bearer' || partsAuthHeader.length !== 2) {
            return Send.sendUnauthorized(res, AUTH_ERRORS.MALFORMED_TOKEN);
        }
        const token = partsAuthHeader[1];
        const decoded: TokenPayload = verifyToken(token);
        req.user = decoded;
        return authStorage.run({
            userId: decoded.id,
            userName: decoded.name,
            role: decoded.role
        }, () => {
            next();
        });

    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro na autenticação:', error.message);
            if (error.message.includes('Token não fornecido') || error.message.includes('Token mal formatado')) {
                Send.sendUnauthorized(res, error.message);
            }

        }
        Send.sendInternalServerError(res, 'Erro interno do servidor');
    }
}