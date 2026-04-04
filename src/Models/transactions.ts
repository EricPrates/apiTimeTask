import { User } from "./User";
import { Task } from "./Task";
import { RegisterTime } from "./RegisterTime";

RegisterTime.belongsTo(User,{
    foreignKey:'userId',
    as:'user'
});

User.hasMany(RegisterTime, {
    foreignKey: 'userId',
    as:'registers_time'
})
User.hasMany(Task, {
    foreignKey: 'userId',
    as: 'tasks'
})
Task.belongsTo(User, {
    foreignKey:'userId',
    as:'user'
});

Task.hasMany(RegisterTime, {
    foreignKey:'taskId',
    as:'registers_time'
});
RegisterTime.belongsTo(Task, {
    foreignKey:'taskId',
    as:'task'
})