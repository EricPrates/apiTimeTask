import { Response, NextFunction, Request } from 'express';
import { ITaskService } from '../types/function.types';
import { CreateTaskDTO, TaskResponseDTO, UpdateTaskDTO } from '../types/task.types';
import { validateID } from '../services/util.ValidatorsService';
import { Send } from '../util/sendHandler';
import { getContext } from '../util/authStorage';
import { AppError } from '../Models/AppError';
import { HTTP_STATUS } from '../util/sendMessages';

export function makeTaskController(service: ITaskService) {
    return {
        async getTasksByUserId(_req: Request, res: Response, next: NextFunction) {
            try {
                const { id } = getContext() || {};
                const userId = validateID(id!);
                const tasks = await service.getTasksByUserId(userId);
                const tasksResponse: TaskResponseDTO[] = tasks.map(task => ({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    status: task.status
                }));
                Send.sendSuccess(res, 'Tarefas recuperadas com sucesso', tasksResponse);
            } catch (error) {
                next(error);
            }
        },

        async createTask(req: Request, res: Response, next: NextFunction) {
            try {
                const { id } = getContext() || {};
                const { title, description, status } = req.body;
                const taskDto: CreateTaskDTO = { title, description, status };
                const newTask = await service.createTask(taskDto, id!);
                const taskResponse: TaskResponseDTO = {
                    id: newTask.id,
                    title: newTask.title,
                    description: newTask.description,
                    status: newTask.status
                };
                Send.sendCreated(res, 'Tarefa criada com sucesso', taskResponse);
            } catch (error) {
                next(error);
            }
        },

        async updateTask(req: Request, res: Response, next: NextFunction) {
            try {
                const context = getContext();
                const userIdValidated = validateID(context?.id!);
                const taskId = validateID(parseInt(req.params['id'] as string));
                const { title, description, status } = req.body;
                const updateDTO: UpdateTaskDTO = { title, description, status };
                const updatedTask = await service.updateTask(taskId, userIdValidated, updateDTO);
                if (!updatedTask) {
                    throw new AppError(HTTP_STATUS.NOT_FOUND, 'Tarefa não encontrada para o usuário');
                }
                const taskResponse: TaskResponseDTO = {
                    id: updatedTask.id,
                    title: updatedTask.title,
                    description: updatedTask.description,
                    status: updatedTask.status
                };
                Send.sendSuccess(res, 'Tarefa atualizada com sucesso', taskResponse);
            } catch (error) {
                next(error);
            }
        }
    };
}
