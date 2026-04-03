import { padronizedResp } from "../../services/util.ValidatorsService";
import { NextFunction } from "express";
import { AuthRequest, TokenPayload } from "../../types/types";
import { Response } from "express";
import { verifyToken } from "./verifyToken";
import { HTTP_STATUS, AUTH_ERRORS, SERVER_ERRORS  } from "../../GlobalErrors";
export async function adminProcessToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response> {

    try {
        if(req.user!.role !== 'admin') {
            const resp = padronizedResp(HTTP_STATUS.FORBIDDEN, AUTH_ERRORS.INSUFFICIENT_PRIVILEGES);
            return res.status(resp.status).json(resp);
        }
        next();
    } catch (error) {
        const resp = padronizedResp(HTTP_STATUS.INTERNAL_SERVER_ERROR, SERVER_ERRORS.INTERNAL_SERVER_ERROR);
        return res.status(resp.status).json(resp);
    }
}
export async function processToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response> {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error(AUTH_ERRORS.NO_TOKEN);
        }
        const partsAuthHeader = authHeader.split(' ');
        if (partsAuthHeader[0] !== 'Bearer' || partsAuthHeader.length !== 2) {
            throw new Error(AUTH_ERRORS.MALFORMED_TOKEN);
        }
        const token = partsAuthHeader[1];
        const decoded = verifyToken(token);
        req.user = decoded as TokenPayload;
        next();

    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao processar token:', error.message);
            if (error.message.includes('Token não fornecido') || error.message.includes('Token mal formatado')) {
                const resp = padronizedResp(HTTP_STATUS.UNAUTHORIZED, error.message);
                return res.status(resp.status).json(resp);
            }

        }
        const resp = padronizedResp(HTTP_STATUS.INTERNAL_SERVER_ERROR, SERVER_ERRORS.INTERNAL_SERVER_ERROR);
        return res.status(resp.status).json(resp);
    }
}