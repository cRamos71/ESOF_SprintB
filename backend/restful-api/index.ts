import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes/user-router';  // Import the router
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/api', router);  // Prefix your routes with `/api`

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});