import { Router } from "express";
import UserRouter from "./user-router";


const router: Router = Router();

router.use("/api/", UserRouter);

export default router;