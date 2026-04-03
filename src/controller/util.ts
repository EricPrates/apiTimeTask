import { PadronizedResp } from "../types/types";
import { DataTypes } from 'sequelize';

export const padronizedResp = (status: number, message: string, data?: any) =>  {
    return {
        status,
        message,
        data: data || null
    } as PadronizedResp;
}

