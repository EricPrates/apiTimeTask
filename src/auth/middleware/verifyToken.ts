import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthContext } from '../../types/util.types';
import { AppError } from '../../Models/AppError';
dotenv.config();

export const verifyToken  = (token: string): AuthContext => {
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET || 'default_secret');
        return decoded as AuthContext;
    } catch (error) {
        throw new AppError(401);
    }
};
