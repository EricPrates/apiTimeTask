import sequelize from '../database/database';
import {Model, DataTypes, Optional} from 'sequelize';
import { IRegisterTime } from '../types/types';

 type RegisterTimeOptionalAttributes = Optional<IRegisterTime, 'id' | 'createdAt' | 'updatedAt'>;

export class RegisterTime extends Model<IRegisterTime, RegisterTimeOptionalAttributes> implements IRegisterTime {
    public id!: number;
    public userId!: number;
    public taskId!: number;
    public startTime!: Date;
    public endTime!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}

RegisterTime.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
                       
    },
    taskId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    startTime:{
        type: DataTypes.DATE,
        allowNull:false
    },
    endTime:{
        type:DataTypes.DATE,
        allowNull:false
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},{
    sequelize,
    modelName:'RegisterTime',
    tableName: 'registers_time'
})