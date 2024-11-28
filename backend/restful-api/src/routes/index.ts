import { Router } from "express";
import UserRouter from "./user-router";
import LoginRouter from "./login-router";
import LogoutRouter from "./logout-router";



const router: Router = Router();

router.use("/api", UserRouter);
router.use("/api", LoginRouter);
router.use("/api", LogoutRouter);



export default router;