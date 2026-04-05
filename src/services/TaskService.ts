import { Task } from '../Models/Task';
import { ITaskRepository, ITaskService, TaskCreateDTO, TaskUpdateDTO } from '../types/types';
import { verifyStringRequiredFields, validateTitle } from './util.ValidatorsService';
import { AppError } from '../Models/AppError';

export const TaskService: ITaskService = {
    async getTasksByUserId(repository: ITaskRepository, id: number): Promise<Task[]> {
        const tasks = await repository.findTasksByUserId(id);
        if (!tasks || tasks.length === 0) {
            throw new AppError(404, 'Nenhuma tarefa encontrada para o usuário');
        }
        return tasks;
    },

    async createTask(repository: ITaskRepository, data: TaskCreateDTO, userId: number): Promise<Task> {
        verifyStringRequiredFields(data, ['title', 'description', 'status']);
        validateTitle(data.title.toString());
        return await repository.createTask({ ...data, userId });
    },

    async updateTask(repository: ITaskRepository, id: number, userId: number, data: TaskUpdateDTO): Promise<Task> {
        verifyStringRequiredFields({ id, userId }, ['id', 'userId']);
        verifyStringRequiredFields(data, ['title', 'description', 'status']);
        if (Object.keys(data).length === 0) {
            throw new AppError(400, 'Nenhum campo para atualizar foi fornecido');
        }
        validateTitle(data.title!.toString());
        const updated = await repository.update(data, id, userId);
        if (!updated) {
            throw new AppError(404, 'Tarefa não encontrada para o usuário');
        }
        return updated;
    }
};
