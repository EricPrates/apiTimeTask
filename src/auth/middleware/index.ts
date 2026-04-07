
import { NextFunction, Request, Response} from "express";
import { verifyToken } from "./verifyToken";
import { AUTH_ERRORS } from "../../util/sendMessages";
import { Send } from "../../util/sendHandler";
import { authStorage } from "../../util/authStorage";
import { AppError } from "../../Models/AppError";
import { AuthContext } from "../../types/util.types";
export async function adminProcessToken(_req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    const context = authStorage.getStore();
    if (!context || context.role !== 'admin') {
        return Send.sendForbidden(res,);
    }
    next();
}
export async function processToken(req: { headers: { authorization?: string } }, res: Response, next: NextFunction): Promise<void | Response> {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return Send.sendUnauthorized(res, AUTH_ERRORS.NO_TOKEN);
        }
        const partsAuthHeader = authHeader.split(' ');
        if (partsAuthHeader[0] !== 'Bearer' || partsAuthHeader.length !== 2) {
            throw new AppError(401, AUTH_ERRORS.INVALID_TOKEN);
        }
        const token = partsAuthHeader[1];
        const decoded: AuthContext = verifyToken(token);
        return authStorage.run({
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role
        }, () => {
            next();
        });

    } catch (error) {
        next(error);
    }
}