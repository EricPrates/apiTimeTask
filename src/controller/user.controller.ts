import { NextFunction } from "express";
import { Response, Request } from "express";
import { IUserService } from "../types/types";
import { Send } from "../util/sendHandler";

export function makeUserController(service:IUserService) {
    return {
        async register(req: Request, res: Response, next: NextFunction) {
            try {
                const { name, email, senha } = req.body;
                const userData = { name, email, senha };
                const newUser = await service.register(userData);
                Send.sendCreated(res, 'Usuário registrado com sucesso', newUser);
            } catch (error) {
                next(error);
            }
        },

        async login(req: Request, res: Response, next: NextFunction) {
            try {
                const { email, senha } = req.body;
                const token = await service.login(email, senha);
                Send.send(res, 200, 'Login bem-sucedido', { token });
            } catch (error) {
                next(error);
            }
        }
    };

}