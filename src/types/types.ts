// types/types.ts
import { User } from "../Models/User";
import { Task } from "../Models/Task";
import { RegisterTime } from "../Models/RegisterTime";


export type CreateUserDTO = {
    name: string;
    email: string;
    password: string;  
    role?: 'user' | 'admin';
}
export type LoginDTO = {
    email: string;
    password: string;
};

export type UserResponseDTO = {
    id?: number;
    name: string;
    email: string;
    role: 'user' | 'admin';   
}
export type CreateTaskDTO = {
    title: string;
    description?: string;
    status?: 'pending' | 'in_progress' | 'completed';
}

export type UpdateTaskDTO = {
    title?: string;
    description?: string;
    status?: 'pending' | 'in_progress' | 'completed';
}

export type TaskResponseDTO = {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
}

// ========== Repository Interfaces ==========
export interface IUserRepository {
    findById(id: number): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    createUser(data: CreateUserDTO): Promise<User>;
}

export interface ITaskRepository {
    findTasksByUserId(userId: number): Promise<Task[]>;
    createTask(data: CreateTaskDTO & { userId: number }): Promise<Task>;
    updateTask(id: number, userId: number, data: UpdateTaskDTO): Promise<Task | null>;
}

// ========== Service Interfaces ==========
export interface IUserService {
    register(data: CreateUserDTO): Promise<UserResponseDTO>;
    login(data: LoginDTO): Promise<{ token: string; user: UserResponseDTO }>;
}

export interface ITaskService {
    getTasksByUserId(userId: number): Promise<TaskResponseDTO[]>;
    createTask(data: CreateTaskDTO, userId: number): Promise<TaskResponseDTO>;
    updateTask(id: number, userId: number, data: UpdateTaskDTO): Promise<TaskResponseDTO | null>;
}

// ========== Utilitários ==========
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

export interface TokenPayload {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
}