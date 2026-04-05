import { TaskRepository } from './repo/TaskRepository';
import { TaskService } from './services/TaskService';
import { makeTaskController } from './controller/tasks.controller';
import { UserRepository } from './repo/UserRepository';
import { UserService } from './services/UserService';
import { RegisterTime } from './Models/RegisterTime';

export const taskController = makeTaskController(TaskService, TaskRepository);
export const authController = makeAuthController(UserService, UserRepository);
export const RegisterTimeController = makeRegisterTimeController(RegisterTimeService, RegisterTimeRepository);