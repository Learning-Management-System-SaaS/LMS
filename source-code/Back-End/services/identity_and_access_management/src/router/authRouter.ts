import { Router } from "express";
import { Signup, Login } from "../controllers/authController";
import { loginUserSchema, signupUserSchema } from "../validations/userValidationSchemas";
import { validateRequestBody } from "../middlewares/validateRequestBody";

/**
 * Express router to handle authentication related routes.
 *
 * This router provides the following routes:
 * - POST `/login` - to login a user with email and password.
 * - POST `/register` - to register a new user.
 * @module userRouter
 * @type {Router}
 */
const router: Router = Router();

/**
 * POST /api/auth/login
 *
 * Login a user with email and password.
 *
 * @route GET /api/users/:id
 * @group Auth - Operations related to authentication users
 * @access Public
 * @returns {Promise<Response>} 200 - The user successfully logged in.
 * @returns {Promise<Response>} 400 - Validation error, missing or incorrect user data.
 * @returns {Promise<Response>} 500 - An error occurred while logging in the user.
 */

router.post("/login", validateRequestBody(loginUserSchema), Login);
router.post("/signup", validateRequestBody(signupUserSchema),Signup);


export default router 
