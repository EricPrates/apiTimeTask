
import bcrypt from 'bcrypt';
import { verifyEmail, verifyPassword } from './util.ValidatorsService';
import { generateToken } from '../auth/generateToken';
import { CreateUserDTO, UserResponseDTO } from '../types/user.types';
import { IUserRepository } from '../types/function.types';
import { AuthContext } from '../types/util.types';
import { AppError } from '../Models/AppError';


export const makeUserService = (repository: IUserRepository) => {
    return {
        async register(data: CreateUserDTO): Promise<UserResponseDTO> {
            
                verifyEmail(data.email);
                verifyPassword(data.password);
                const existingUser = await repository.findUserByEmail(data.email);
                if (existingUser) {
                    throw new AppError(400, 'Email já registrado');
                }
                const hashedPassword = await bcrypt.hash(data.password, 10);
                const user = await repository.createUser({ ...data, password: hashedPassword });
                
                const response: UserResponseDTO = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
                if (!response) {
                    throw new AppError(500, 'Erro ao registrar usuário');
                 }
                return response;
            
        },

        async login(data: CreateUserDTO): Promise< { token: string; user: UserResponseDTO } > {
            if(!data.email || !data.password) {
                throw new AppError( 400, 'Email e senha são obrigatórios');
            }
            
            const user = await repository.findUserByEmail(data.email);
            if (!user) {
                throw new AppError(400, 'Credenciais Inválidas');
            }
            const passwordMatch = await bcrypt.compare(data.password, user.password);
            if (!passwordMatch) {
                throw new AppError(400, 'Credenciais Inválidas');
            }
           
            const payload = { name: user.name, id: user.id, email: user.email, role: user.role } as AuthContext;
            const token = generateToken(payload);

            return {
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            };
        }
    };
};