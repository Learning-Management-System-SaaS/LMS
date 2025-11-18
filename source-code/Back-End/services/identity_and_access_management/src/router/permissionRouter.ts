import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isAuthorized } from "../middlewares/isAuthorized";
import { ROLES } from "../config/roles";
import { createRole, deleteRole, getAllRoles, getRole, updateRole } from "../controllers/roleController";


const router = Router()

router.use(authMiddleware)
router.use(isAuthorized({ allowedRoles: [ROLES.SAAS_OWNER] }))

/**
 * Express router to handle user-related routes.
 *
 * This router provides the following routes:
 * - GET `/all` - Fetch all users in the database.
 * - GET `/` - Fetch all users for specific tenant.
 * - GET `/:id` - Fetch a user by ID.
 * - POST `/` - Create a new user.
 * - PUT `/:id` - Update a user by ID.
 * - DELETE `/:id` - Delete a user by ID.
 * @module permissionRouter
 * @type {Router}
 */
router.get('/',getAllRoles)
router.get('/:id',getRole)
router.post('/',createRole)
router.put('/:id',updateRole)
router.delete('/:id',deleteRole)

export default router