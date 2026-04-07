import { Model, DataTypes} from 'sequelize';
import sequelize from '../database/database';

import { RegisterTime } from './RegisterTime';
import { Task } from './Task';


export class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public tasks?: Task[];
    public registerTimes?: RegisterTime[]
    public role!: 'user' | 'admin';
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
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,

    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});

