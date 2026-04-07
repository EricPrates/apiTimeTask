import { NextFunction } from "express";
import { Response, Request } from "express";
import { IUserService, CreateUserDTO } from "../types/util.types";
import { Send } from "../util/sendHandler";


export function makeUserController(service:IUserService) {
    return {
        async register(req: Request, res: Response, next: NextFunction) {
            try {
                const { name, email, password } = req.body;
                const userData : CreateUserDTO = { name, email, password, role: 'user' };
                await service.register(userData);
                Send.sendCreated(res, 'Usuário registrado com sucesso');
            } catch (error) {
                next(error);
            }
        },

        async login(req: Request, res: Response, next: NextFunction) {
            try {
        
                const { email, password } = req.body;
                const userDto : CreateUserDTO = { name: '', email, password };
                const token = await service.login(userDto);
                Send.send(res, 200, 'Login bem-sucedido', { token });
            } catch (error) {
                next(error);
            }
        }
    };

}