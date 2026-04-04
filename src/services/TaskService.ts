import { Task } from '../Models/Task';
import { TaskRepository } from '../repo/TaskRepository';
import { ITaskRepository, TaskCreateDTO, TaskUpdateDTO } from '../types/types';

import { validateID, verifyStringRequiredFields, validateTitle } from './util.ValidatorsService';


export const TaskService = {
  async getTasksByUserId( repository: ITaskRepository, id: number): Promise<Task[]> {
    
        
        const tasksByUserId = await repository.findTasksByUserId(id);
        if (!tasksByUserId || tasksByUserId.length === 0) {
            throw new Error('Nenhuma tarefa encontrada para o usuário');
        }
        return tasksByUserId;
    },

    async createTask(repository: ITaskRepository, data: TaskCreateDTO, userId: number): Promise<Task> {
        verifyStringRequiredFields(data, ['title', 'description', 'status']);

        const titleTyped = data.title.toString();
        validateTitle(titleTyped);

        const newTask = await repository.createTask({ ...data, userId });
        return newTask;
    },
    async updateTask(repository: ITaskRepository, id: number , userId: number , data: TaskUpdateDTO): Promise<Task> {
        verifyStringRequiredFields({ id, userId }, ['id', 'userId']);

        verifyStringRequiredFields(data, ['title', 'description', 'status']);
        if(Object.keys(data).length === 0) {
            throw new Error('Nenhum campo para atualizar foi fornecido');
        }
        const tytleTyped = data.title!.toString()
        validateTitle(tytleTyped);

        const taskUpdated = await repository.update(data, id, userId);

        if(!taskUpdated) {
            throw new Error('Tarefa não encontrada para o usuário');
        }
        return taskUpdated;

    }
}
