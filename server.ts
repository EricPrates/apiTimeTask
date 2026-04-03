import express from 'express';
import cors from 'cors';


const app: express.Application = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'Hello, World!' });
});

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
