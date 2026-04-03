import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/database';
import { IUser } from '../types/types';
import { RegisterTime } from './RegisterTime';
import { Task } from './Task';

type UserOptionalAttributes = Optional<IUser, 'id' | 'createdAt' | 'updatedAt'>;

export class User extends Model<IUser, UserOptionalAttributes> implements IUser {
    public id!: number;
    public name!: string;
    public email!: string;
    public senha!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public tasks?: Task[];
    public registerTimes?: RegisterTime[]
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    senha:{
        type:DataTypes.STRING,
        allowNull: false,

    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});

