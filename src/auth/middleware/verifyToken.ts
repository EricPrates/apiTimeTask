import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenPayload } from '../../types/types';
dotenv.config();

export const verifyToken  = (token: string): TokenPayload => {
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET || 'default_secret');
        return decoded as TokenPayload;
    } catch (error) {
        throw new Error('Token inválido');
    }
};
