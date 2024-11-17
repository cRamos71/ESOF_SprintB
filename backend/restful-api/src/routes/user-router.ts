import express from 'express';
import { registerUser } from '../controllers/user-controller'; // Correctly import the register function

const router = express.Router();  // TypeScript will infer the correct type for router


// User routes
router.post('/register', registerUser);

export default router;
