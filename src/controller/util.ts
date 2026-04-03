import { PadronizedResp } from "../types/types";
import { DataTypes } from 'sequelize';

export const padronizedResp = (status: number, message: string, data?: any): PadronizedResp =>  {
    const response = {
        status,
        message,
    } as PadronizedResp;

    if (data !== undefined) {
        response.data = data;
    }
    return response;
};



