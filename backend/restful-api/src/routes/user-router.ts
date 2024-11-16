import { Router } from "express";
import {
  register
} from "../controllers/user-controller";


const router: Router = Router();

// User routes
router.post('/register', register);

export default router;
