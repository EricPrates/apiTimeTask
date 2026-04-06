
import bcrypt from 'bcrypt';
import { IUserRepository,  UserResponseDTO, CreateUserDTO, TokenPayload } from '../types/types';
import { verifyEmail, verifyPassword } from './util.ValidatorsService';
import { generateToken } from '../auth/generateToken';

export const makeUserService = (repository: IUserRepository) => {
    return {
        async register(data: CreateUserDTO): Promise<UserResponseDTO> {
            verifyEmail(data.email);
            verifyPassword(data.password);
            const existingUser = await repository.findUserByEmail(data.email);
            if (existingUser) {
                throw new Error('Email já registrado');
            }
            const hashedSenha = await bcrypt.hash(data.password, 10);
            const user = await repository.createUser({ ...data, password: hashedSenha });
            const response: UserResponseDTO = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            return response;
        },

        async login(data: CreateUserDTO): Promise< { token: string; user: UserResponseDTO } > {
            if(!data.email || !data.password) {
                throw new Error('Email e senha são obrigatórios');
            }
            
            const user = await repository.findUserByEmail(data.email);
            if (!user) {
                throw new Error('Credenciais Inválidas');
            }
            const passwordMatch = await bcrypt.compare(data.password, user.password);
            if (!passwordMatch) {
                throw new Error('Credenciais Inválidas');
            }
           
            const payload = { name: user.name, id: user.id, email: user.email, role: user.role } as TokenPayload;
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