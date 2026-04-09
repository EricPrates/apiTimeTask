
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
