import { Task } from "../Models/Task";

export interface ITask {
    id?: number;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    createdAt?: Date;
    updatedAt?: Date;
    userId? : number;
  
}

export interface IUser {
    id?: number;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    senha: String
   
}
export interface IRegisterTime {
    id?: number;
    userId: number;
    taskId: number;
    startTime: Date;
    endTime: Date;
    createdAt?: Date;
    updatedAt?: Date;
   
} 
export interface PadronizedResp {
    status: number;
    message: string;
    data: any;
}
export interface AuthRequest extends Request {
    user?: {
        id: number;
        name: string;
        email: string;
    };
}
export type TaskCreateDTO = {
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
}
export type TaskResponseDTO = {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
   
}
export interface ITaskRepository {
    findTasksByUserId(userId: number): Promise<Task[]>;
    createTask(data: ITask): Promise<Task>;
    update(data: Partial<ITask>, taskId: number, userId: number): Promise<Task>;
}
export interface TaskUpdateDTO {
    title?: string;
    description?: string;
    status?: 'pending' | 'in_progress' | 'completed';
}