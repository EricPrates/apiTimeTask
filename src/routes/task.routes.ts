import express from 'express';
import { taskController } from "../containers";
import { Application } from 'express';
const router = express.Router();
router.get('/', taskController.getTasksByUserId);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);



export default function registerTaskRoutes(app: Application) {
    app.use('/tasks', router);
}