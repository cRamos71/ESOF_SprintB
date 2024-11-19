import express from 'express';
import dotenv from 'dotenv';
import routerRegister from './src/routes/user-router';  // Import the router
import routerLogin from './src/routes/login-router';
import routerJob from './src/routes/job-router';
import cors from 'cors';
import { error } from 'console';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use((err: Error, req: any, res: any, next: any) => {
    res.status(200).json({ message: err.message });
  });
app.use(express.json());
app.use('/api', routerRegister); 
app.use('/api', routerLogin);
app.use('/api', routerJob);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});