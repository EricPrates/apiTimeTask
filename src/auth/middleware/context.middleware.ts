import { NextFunction } from "express";
import { AuthRequest, TokenPayload } from "../../types/types";
import { verifyToken } from "./verifyToken";
import { AUTH_ERRORS } from "../../util/sendMessages";
import { authStorage } from "../../util/authStorage";
import { decode } from "jsonwebtoken";


export const contextMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    let decoded : TokenPayload | null = null;
    if (authHeader) {
        const partsAuthHeader = authHeader.split(' ');
        if (partsAuthHeader[0] === 'Bearer' && partsAuthHeader.length === 2) {
            try {
                const token = partsAuthHeader[1];
                decoded = verifyToken(token);
            } catch (error) {
                console.error('Erro na autenticação:', error instanceof Error ? error.message : error);
                decoded = null;
            }
        }
               
    }
    authStorage.run( decoded as any, () => {
    next();
    });
};