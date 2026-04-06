import { User } from "../Models/User";
import { IUser, IUserRepository, IUserService, TokenPayload } from '../types/types';

export const makeUserService = (repository: IUserRepository) => {
    return {
        async register(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
            const existingUser = await repository.findUserByEmail(data.email);
            if (existingUser) {
                throw new Error('Email já registrado');
            }
            await repository.createUser(data);
        },

        async login(email: string, senha: string): Promise<TokenPayload> {
            const user = await repository.findUserByEmail(email);
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            if (user.senha !== senha) {
                throw new Error('Senha incorreta');
            }

            return 'token';
        }
    };
};