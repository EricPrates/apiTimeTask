import { NextFunction } from "express";
import { Response, Request } from "express";
import { IUserService } from "../types/function.types";
import { CreateUserDTO } from "../types/user.types";
import { Send } from "../util/sendHandler";


export function makeUserController(service:IUserService) {
    return {
        async register(req: Request, res: Response, next: NextFunction) {
            try {
                const { name, email, password } = req.body;
                const userData : CreateUserDTO = { name, email, password, role: 'user' };
                const registeredUser = await service.register(userData);
                return Send.sendCreated(res, 'Usuário registrado com sucesso', registeredUser);
            } catch (error) {
                next(error);
            }
        },

        async login(req: Request, res: Response, next: NextFunction) {
            try {
        
                const { email, password } = req.body;
                if (!email || !password) {
                    return Send.sendBadRequest(res, 'Email e senha são obrigatórios');
                }
                const userDto : CreateUserDTO = { name: '', email, password };
                const user = await service.login(userDto);
                 return Send.send(res, 200, 'Login bem-sucedido' , user);
            } catch (error) {
                next(error);
            }
        }
    };

}