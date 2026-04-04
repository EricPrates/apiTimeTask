import { NextFunction, Request } from "express";
import { verifyToken } from "./verifyToken";
import { authStorage } from "../../util/authStorage";
import { TokenPayload } from "../../types/types";
import { Response } from "express-serve-static-core";


export async function contextMiddleware (req: Request, res: Response, next: NextFunction): Promise<void> {
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