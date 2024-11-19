import express from 'express';
import { login } from "../controllers/login-controller";  // Correct the path here



const router = express.Router();  // TypeScript will infer the correct type for router


router.post('/login', login);


export default router;
