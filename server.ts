import express from 'express';
import cors from 'cors';
import { errorHandler } from './src/auth/middleware/erroHandler';
import { contextMiddleware } from './src/auth/middleware/context.middleware';
import { dinamicRoutes } from './src/routes/config';
import { userController } from './src/containers';
const app: express.Application = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req: express.Request, res: express.Response) => {

  res.json({ message: 'Hello, World!' });
});
app.use('/login', userController.login);
app.use('/register', userController.register);
app.use(contextMiddleware);
app.use(dinamicRoutes);
app.use(errorHandler)
const PORT: number = process.env.PORT? parseInt(process.env.PORT) : 5000;

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();
