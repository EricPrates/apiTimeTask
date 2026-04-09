import express from 'express';
import cors from 'cors';
import { errorHandler } from './src/auth/middleware/erroHandler';
import { contextMiddleware } from './src/auth/middleware/context.middleware';
import { dinamicRoutes } from './src/routes/config';
import { userController } from './src/containers';
import sequelize from './src/database/database';
import './src/Models/User';
import './src/Models/Task';
import './src/Models/RegisterTime';
import taskRoutes from './src/routes/task.routes';
const app: express.Application = express();
const corsOptions = {
  origin: '*', 
  
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req: express.Request, res: express.Response) => {

  res.json({ message: 'Hello, World!' });
});
app.use('/login', userController.login);
app.use('/register', userController.register);

const apiRouter = express.Router();
apiRouter.use(contextMiddleware);
apiRouter.use(dinamicRoutes);
apiRouter.use(taskRoutes);

app.use('/api', apiRouter);
app.use(errorHandler);
const PORT: number = process.env.PORT? parseInt(process.env.PORT) : 5005;

(async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      
    });
  } catch (error) {
  }
})();
