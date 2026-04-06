import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/database';
import { User } from './User';


export class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public status!: 'pending' | 'in_progress' | 'completed';
    public createdAt!: Date;
    public updatedAt!: Date;
    public userId!: number;
    public user?: User;
}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
});