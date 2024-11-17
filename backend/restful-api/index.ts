import express from 'express';
import dotenv from 'dotenv';
import routerRegister from './src/routes/user-router';  // Import the router
import routerLogin from './src/routes/login-router';
import cors from 'cors';
import { error } from 'console';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  }));
app.use(express.json());
app.use('/api', routerRegister);  // Prefix your routes with `/api`
app.use('/api', routerLogin);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});