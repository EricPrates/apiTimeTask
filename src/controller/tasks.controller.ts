import { Response, NextFunction } from 'express';
import { ITaskRepository, ITaskService, AuthRequest, TaskCreateDTO, TaskResponseDTO, TaskUpdateDTO } from '../types/types';
import { validateID } from '../services/util.ValidatorsService';
import { Send } from '../util/sendHandler';
import { getContext } from '../util/authStorage';

export function makeTaskController(service: ITaskService, repository: ITaskRepository) {
    return {
        async getTasksByUserId(_req: AuthRequest, res: Response, next: NextFunction) {
            try {
                const { id } = getContext() || {};
                const userId = validateID(id!);
                const tasks = await service.getTasksByUserId(repository, userId);
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

        async createTask(req: AuthRequest, res: Response, next: NextFunction) {
            try {
                const { id } = getContext() || {};
                const { title, description, status } = req.body;
                const taskDto: TaskCreateDTO = { title, description, status };
                const newTask = await service.createTask(repository, taskDto, id!);
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

        async updateTask(req: AuthRequest, res: Response, next: NextFunction) {
            try {
                const context = getContext();
                const userIdValidated = validateID(context?.id!);
                const taskId = validateID(parseInt(req.params['id'] as string));
                const { title, description, status } = req.body;
                const updateDTO: TaskUpdateDTO = { title, description, status };
                const updatedTask = await service.updateTask(repository, taskId, userIdValidated, updateDTO);
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
