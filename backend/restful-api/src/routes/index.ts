import { Router } from "express";
import UserRouter from "./user-router";
import LoginRouter from "./login-router";

const router: Router = Router();

router.use("/api", UserRouter);
router.use("/api", LoginRouter);

export default router;