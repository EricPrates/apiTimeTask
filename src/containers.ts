// composition.ts ou app.ts

import { TaskRepository } from './repo/TaskRepository';
import { UserRepository } from './repo/UserRepository';
import { makeTaskService } from './services/TaskService';
import { makeUserService } from './services/UserService';
import { makeTaskController } from './controller/tasks.controller';
import { makeUserController } from './controller/user.controller';


const taskRepository = TaskRepository;
const userRepository = UserRepository;


const taskService = makeTaskService(taskRepository);
const userService = makeUserService(userRepository);

export const taskController = makeTaskController(taskService);  // ← só service
export const userController = makeUserController(userService);  // ← só service