import sequelize from '../database/database';
import {Model, DataTypes} from 'sequelize';
import { User } from './User';
import { Task } from './Task';

export class RegisterTime extends Model {
    public id!: number;
    public userId!: number;
    public taskId!: number;
    public startTime!: Date;
    public endTime!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
    public user?: User;
    public task?: Task;
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
            references: {
                model: 'users',
                key: 'id'
            }
    },
    taskId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: 'tasks',
            key: 'id'
        }
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
});

User.hasMany(RegisterTime, { foreignKey: 'userId', as: 'registers' });
RegisterTime.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Task.hasMany(RegisterTime, { foreignKey: 'taskId', as: 'registers' });
RegisterTime.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });