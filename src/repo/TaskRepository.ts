
import { Task } from "../Models/Task";
import { ITaskRepository, CreateTaskDTO, UpdateTaskDTO } from '../types/util.types';

export const TaskRepository : ITaskRepository = {
    async findTasksByUserId(userId: number) {
        return Task.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });
    },
    async createTask(data: CreateTaskDTO) {
        const newTask = await Task.create(data);
        return newTask;
    },
    async updateTask(taskId: number, userId: number, data: UpdateTaskDTO) {
        const [affectedCount] = await Task.update(data, {
            where: { id: taskId, userId },
        });
        if (affectedCount === 0) {
            return null;
        }
        return await Task.findOne({ where: { id: taskId, userId } });
    }
}