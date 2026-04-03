import { Task } from "../Models/Task";
import { ITaskRepository } from "../types/types";

export const TaskRepository : ITaskRepository = {
    async findTasksByUserId(userId: number) {
        return Task.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });
    },
    async createTask(data: Task) {
        const newTask = await Task.create(data);
        return newTask;
    },
    async update(data: Partial<Task>, taskId: number, userId: number): Promise<Task> {
        const [affectedCount] = await Task.update(data, {
            where: { id: taskId, userId },
        });
       if (affectedCount === 0) {
            throw new Error('Tarefa não encontrada para o usuário');
        }
        return await Task.findOne({ where: { id: taskId, userId } }) as Task;
    }
}