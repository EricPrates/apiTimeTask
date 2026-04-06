import { Task } from "../Models/Task"
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
    senha: string
   
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
export interface BuildResponse {
    status: number;
    message: string;
    data?: any;

}
export interface AuthContext {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
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
export interface ITaskService {
    getTasksByUserId(id: number): Promise<Task[]>;
    createTask(data: TaskCreateDTO, userId: number): Promise<Task>;
    updateTask(id: number, userId: number, data: TaskUpdateDTO): Promise<Task | null>;
}

export interface ITaskRepository {
    findTasksByUserId(userId: number): Promise<Task[]>;
    createTask(data: ITask): Promise<Task>;
    update(data: TaskUpdateDTO, id: number, userId: number): Promise<Task | null>;
    
}
export interface TaskUpdateDTO {
    title?: string;
    description?: string;
    status?: 'pending' | 'in_progress' | 'completed';
}
export interface TokenPayload {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
}
export interface IUserService {
    register(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<void>;
    login(email: string, senha: string): Promise<string>;
}
export interface IUserRepository {
    findById(id: number): Promise<IUser | null>;
    findUserByEmail(email: string): Promise<IUser | null>;
    createUser(data: IUser): Promise<void>;
}

