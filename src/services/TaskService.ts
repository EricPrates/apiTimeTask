import { Task } from '../Models/Task';
import { ITaskRepository, CreateTaskDTO, UpdateTaskDTO } from '../types/types';
import { verifyStringRequiredFields, validateTitle } from './util.ValidatorsService';
import { AppError } from '../Models/AppError';
import { TASK_ERRORS, HTTP_STATUS } from '../util/sendMessages';

export const makeTaskService = (repository: ITaskRepository) => {
    return {
        async getTasksByUserId(id: number): Promise<Task[]> {
            const tasks = await repository.findTasksByUserId(id);
            if (!tasks || tasks.length === 0) {
                throw new AppError(HTTP_STATUS.NOT_FOUND, 'Nenhuma tarefa encontrada para o usuário');
            }
        return tasks;
    },

        async createTask(data: CreateTaskDTO, userId: number): Promise<Task> {
            verifyStringRequiredFields(data, ['title', 'description', 'status']);
            validateTitle(data.title.toString());
            return await repository.createTask({ ...data, userId });
        },

        async updateTask(id: number, userId: number, data: UpdateTaskDTO): Promise<Task | null> {
            verifyStringRequiredFields(data, ['title', 'description', 'status']);
            if (Object.keys(data).length === 0) {
                throw new AppError(HTTP_STATUS.BAD_REQUEST, 'Nenhum campo para atualizar foi fornecido');
            }
            validateTitle(data.title!.toString());
            const updated = await repository.updateTask(id, userId, data);
            if (!updated) {
                throw new AppError(HTTP_STATUS.NOT_FOUND, TASK_ERRORS.NOT_FOUND);
            }
            return updated;
        }
    };
};
