import { Router } from "express";
import { login } from "controllers/";  // Correct the path here



const router: Router = Router();


router.post('/login', login);


export default router;
