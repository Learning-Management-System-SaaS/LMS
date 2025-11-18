import { Router } from "express";
import { router as healthCheckEndPoint } from "./healthCheckEndPoint";
import { authMiddleware } from "../middlewares/authMiddleware";
import userRouter from "./userRouter";
import authRouter  from "./authRouter";
import roleRouter from "./roleRouter"
import permissionRouter from "./permissionRouter"

/**
 * Express router to handle user-related routes. *
 * @module UserRouter
 * @type {Router}
 */
const router: Router = Router();

router.use("/users", userRouter);
router.use("/role", roleRouter);
router.use("/permission", permissionRouter);

router.use("/auth", authRouter);
router.use(healthCheckEndPoint);

export { router };
