import { promiseHooks } from "node:v8";
import { Task } from "../Models/Task";
import { ITaskRepository, TaskCreateDTO, TaskUpdateDTO } from '../types/types';

export const TaskRepository : ITaskRepository = {
    async findTasksByUserId(userId: number) {
        return Task.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });
    },
    async createTask(data: TaskCreateDTO) {
        const newTask = await Task.create(data);
        return newTask;
    },
    async update(data: TaskUpdateDTO, taskId: number, userId: number) {
        const [affectedCount] = await Task.update(data, {
            where: { id: taskId, userId },
        });
        if (affectedCount === 0) {
            return null;
        }
        return await Task.findOne({ where: { id: taskId, userId } });
    }
}