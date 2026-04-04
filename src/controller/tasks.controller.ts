import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import { buildResponse } from '../util/buildResponse';
import { AuthRequest, TaskCreateDTO, TaskResponseDTO, TaskUpdateDTO } from '../types/types';
import { validateID } from '../services/util.ValidatorsService';
import { TaskRepository } from '../repo/TaskRepository';
import { Task } from '../Models/Task';
import { Send } from '../util/sendHandler';
export async function getTasksByUserId(req: AuthRequest, res: Response) {
    try {
        const { id } = req.user!;
        const userId = validateID(id);
        const tasks = await TaskService.getTasksByUserId(TaskRepository, userId);
        const tasksResponse: TaskResponseDTO[] = tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status
        }));
        Send.sendSuccess(res, 'Tarefas recuperadas com sucesso', tasksResponse);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao buscar tarefas:', error.message);
            if (error.message.includes('O campo Id')) {
                Send.sendBadRequest(res, error.message);
            }
            if (error.message.includes('Nenhuma tarefa encontrada para o usuário')) {
                Send.sendNotFound(res, error.message);
            }
        }
        Send.sendInternalServerError(res, 'Erro interno do servidor');
    }
}

export async function createTask(req: AuthRequest, res: Response) {
    try {
        const {id} = req.user!;
        const { title, description, status } = req.body;

        const taskDto: TaskCreateDTO = {
            title,
            description,
            status
        }

        const newTask = await TaskService.createTask(TaskRepository, taskDto, id);
        const taskResponse: TaskResponseDTO = {
            id: newTask.id,
            title: newTask.title,
            description: newTask.description,
            status: newTask.status
        }
        Send.sendCreated(res, 'Tarefa criada com sucesso', taskResponse);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao criar tarefa:', error.message);
            if (error.message.includes('O campo')) {
                return Send.sendBadRequest(res, error.message);
            }
            return Send.sendInternalServerError(res, 'Erro interno do servidor');
        }
    }
}

export async function updateTask(req: AuthRequest, res: Response) {
    try {
        const { id } = req.user!;
        const { title, description, status  } = req.body;
        const userIdvalidated = validateID(req.user!.id);
        const idValidated = validateID(id);
        const updateDTO: TaskUpdateDTO = {
            title,
            description,
            status
        };
        const updatedTask = await TaskService.updateTask(TaskRepository, idValidated, userIdvalidated, updateDTO);
        const taskResponse: TaskResponseDTO = {
            id: updatedTask.id,
            title: updatedTask.title,
            description: updatedTask.description,
            status: updatedTask.status
        }
        Send.sendSuccess(res, 'Tarefa atualizada com sucesso', taskResponse);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao atualizar tarefa:', error.message);
            if (error.message.includes('O campo')) {
                return Send.sendBadRequest(res, error.message);
            }
            if (error.message.includes('Tarefa não encontrada para o usuário')) {
                return Send.sendNotFound(res, error.message);
                
            }
            if (error.message.includes('Nenhum campo para atualizar foi fornecido')) {
                return Send.sendBadRequest(res, error.message);
            }
        }
        Send.sendInternalServerError(res, 'Erro interno do servidor');
    }

}



