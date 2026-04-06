import express from 'express';
import { taskController } from "../containers";
const router = express.Router();


router.get('/tasks', taskController.getTasksByUserId);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id');

export default (app: express.Application) => {
  app.use('/auth', router);
};