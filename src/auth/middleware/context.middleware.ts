import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./verifyToken";
import { authStorage } from "../../util/authStorage";
import { AuthContext, TokenPayload } from "../../types/types";
import { AppError } from "../../Models/AppError";


export async function contextMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;
    let decoded: TokenPayload | null = null;
    try {
        if (authHeader) {
            const partsAuthHeader = authHeader.split(' ');
            if (partsAuthHeader[0] === 'Bearer' && partsAuthHeader.length === 2) {
                const token = partsAuthHeader[1];
                decoded = verifyToken(token);
                if (!decoded) {
                    throw new AppError(401, 'Token inválido');
                }
            }
        }
        authStorage.run(decoded as AuthContext, () => next());
    } catch (error) {
        next(error)
    }
};