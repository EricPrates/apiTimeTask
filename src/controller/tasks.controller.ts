import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import { padronizedResp } from './util';
import { AuthRequest, TaskCreateDTO, TaskResponseDTO, TaskUpdateDTO } from '../types/types';
import { validateID } from '../services/util.ValidatorsService';
import { TaskRepository } from '../repo/TaskRepository';
import { Task } from '../Models/Task';

export async function getTasksByUserId(req: AuthRequest, res: Response) {
    try {
        const userId = validateID(req.user!.id);
        const tasks = await TaskService.getTasksByUserId(TaskRepository , userId);
        const tasksResponse: TaskResponseDTO[] = tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status
        }));
        const resp = padronizedResp(200, 'Tarefas encontradas', tasksResponse);
        res.status(resp.status).json(resp);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao buscar tarefas:', error.message);
            if (error.message.includes('O campo Id')) {
                const resp = padronizedResp(400, error.message);
                return res.status(resp.status).json(resp);
            }
            if (error.message.includes('Nenhuma tarefa encontrada para o usuário')) {
                const resp = padronizedResp(404, error.message);
                return res.status(resp.status).json(resp);
            }
            
            const resp = padronizedResp(500, 'Erro interno do servidor');
            return res.status(resp.status).json(resp);
        }
    }
}

export async function createTask(req : Request, res: Response) {
    try{
        const userId = req.user!.id;
        const { title, description, status } = req.body;

        const taskDto: TaskCreateDTO = {
            title,
            description,
            status
        }

        const newTask = await TaskService.createTask(TaskRepository , taskDto, req.user!.id);
        
        const resp = padronizedResp(201, 'Tarefa criada com sucesso', newTask);
        return res.status(resp.status).json(resp);
    }catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao criar tarefa:', error.message);
            if (error.message.includes('O campo')) {
                const resp = padronizedResp(400, error.message);
                return res.status(resp.status).json(resp);
            }
            const resp = padronizedResp(500, 'Erro interno do servidor');
            return res.status(resp.status).json(resp);
        }
    }
}

export async function updateTask(req: Request, res : Response) {
    try {
        const { userId, id } = req.params;
        const { title, description, status} = req.body;
        const userIdvalidated = validateID(userId);
        const idValidated = validateID(id);
        const updateDTO: TaskUpdateDTO = {
            title,
            description,
            status
        };
        const updatedTask = await TaskService.updateTask(TaskRepository, idValidated , userIdvalidated, updateDTO);
        const resp = padronizedResp(200, 'Tarefa atualizada com sucesso', updatedTask);
        return res.status(resp.status).json(resp);
    }catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao atualizar tarefa:', error.message);
            if (error.message.includes('O campo')) {
                const resp = padronizedResp(400, error.message);
                return res.status(resp.status).json(resp);
            }
            if (error.message.includes('Tarefa não encontrada para o usuário')) {
                const resp = padronizedResp(404, error.message);
                return res.status(resp.status).json(resp);
            }
            if(error.message.includes('Nenhum campo para atualizar foi fornecido')) {
                const resp = padronizedResp(400, error.message);
                return res.status(resp.status).json(resp);
            }
        }
    }
   
}


    
