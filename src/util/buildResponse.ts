import { BuildResponse } from '../types/types';
import { DataTypes, json } from 'sequelize';

export const buildResponse = (status: number, message: string, data?:any ): BuildResponse =>  {
    const response = {
        status,
        message,
    } as BuildResponse;

    if (data !== undefined) {
        response.data = data;
    }
    return response; // Converter JSON
};



