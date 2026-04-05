import { TaskRepository } from './repo/TaskRepository';
import { TaskService } from './services/TaskService';
import { makeTaskController } from './controller/tasks.controller';

export const taskController = makeTaskController(TaskService, TaskRepository);
