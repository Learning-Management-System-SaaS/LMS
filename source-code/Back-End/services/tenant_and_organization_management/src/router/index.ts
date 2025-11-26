import { Router } from "express";
import { router as tenantRouter } from "./tenantRouter";
import subscriptionRouter from "./subscriptionRouter";
import { router as divisionRouter } from "./divisionRouter";
import locationRouter from "./locationRouter";
import { router as healthCheckRouter } from "./healthCheckRouter";
import { authMiddleware } from "../middlewares/authMiddleware";

/**
 * Express router to handle all service routes.
 * Routes are organized by resource: tenants, subscriptions, divisions, and locations.
 * 
 * @module MainRouter
 * @type {Router}
 */
const router: Router = Router();

router.use(authMiddleware);
router.use("/tenants", tenantRouter);
router.use("/subscriptions", subscriptionRouter);
router.use("/divisions", divisionRouter);
router.use("/locations", locationRouter);
router.use(healthCheckRouter);

export { router };
