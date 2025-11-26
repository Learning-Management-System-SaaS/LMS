import { Router } from "express";
import {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
  getAllPayments,
  getPaymentById,
  createPayment,
  getPaymentsByTenant,
} from "../controllers/subscriptionController";
import { IsValidIdParams } from "../middlewares/IsValidIdParams";
import { validateReqParamsIdMatch } from "../middlewares/validateReqParamsIdMatch";

/**
 * Express router to handle subscription, plan, and payment-related routes.
 *
 * This router provides the following routes:
 * - Subscriptions: GET `/`, GET `/:id`, POST `/`, PUT `/:id`, DELETE `/:id`
 * - Plans: GET `/plans/all`, GET `/plans/:id`, POST `/plans`, PUT `/plans/:id`, DELETE `/plans/:id`
 * - Payments: GET `/payments/all`, GET `/payments/:id`, POST `/payments`, GET `/payments/tenant/:tenantId`
 *
 * Middleware:
 * - `IsValidIdParams` ensures that the ID is valid.
 * - `validateReqParamsIdMatch` ensures request body ID matches URL parameter ID.
 *
 * @module SubscriptionRouter
 * @type {Router}
 */
const router: Router = Router();

// ============== SUBSCRIPTION ROUTES ==============

/**
 * GET /api/subscriptions
 * Fetch all subscriptions
 * 
 * @returns {Promise<Response>} 200 - An array of subscriptions.
 * @returns {Promise<Response>} 500 - An error occurred.
 */
router.get("/", getAllSubscriptions);

/**
 * GET /api/subscriptions/:id
 * Fetch a subscription by ID
 * 
 * @param {string} id - The subscription ID
 * @returns {Promise<Response>} 200 - The subscription object.
 * @returns {Promise<Response>} 404 - Subscription not found.
 */
router.get("/:id", IsValidIdParams, getSubscriptionById);

/**
 * POST /api/subscriptions
 * Create a new subscription
 * 
 * @returns {Promise<Response>} 201 - The created subscription.
 * @returns {Promise<Response>} 400 - Validation error.
 */
router.post("/", createSubscription);

/**
 * PUT /api/subscriptions/:id
 * Update a subscription
 * 
 * @param {string} id - The subscription ID
 * @returns {Promise<Response>} 200 - The updated subscription.
 * @returns {Promise<Response>} 404 - Subscription not found.
 */
router.put("/:id", [IsValidIdParams, validateReqParamsIdMatch], updateSubscription);

/**
 * DELETE /api/subscriptions/:id
 * Delete a subscription
 * 
 * @param {string} id - The subscription ID
 * @returns {Promise<Response>} 200 - Deletion success message.
 * @returns {Promise<Response>} 404 - Subscription not found.
 */
router.delete("/:id", IsValidIdParams, deleteSubscription);

// ============== PLAN ROUTES ==============

/**
 * GET /api/plans/all
 * Fetch all plans
 * 
 * @returns {Promise<Response>} 200 - An array of plans.
 * @returns {Promise<Response>} 500 - An error occurred.
 */
router.get("/plans/all", getAllPlans);

/**
 * GET /api/plans/:id
 * Fetch a plan by ID
 * 
 * @param {string} id - The plan ID
 * @returns {Promise<Response>} 200 - The plan object.
 * @returns {Promise<Response>} 404 - Plan not found.
 */
router.get("/plans/:id", IsValidIdParams, getPlanById);

/**
 * POST /api/plans
 * Create a new plan
 * 
 * @returns {Promise<Response>} 201 - The created plan.
 * @returns {Promise<Response>} 400 - Validation error.
 */
router.post("/plans", createPlan);

/**
 * PUT /api/plans/:id
 * Update a plan
 * 
 * @param {string} id - The plan ID
 * @returns {Promise<Response>} 200 - The updated plan.
 * @returns {Promise<Response>} 404 - Plan not found.
 */
router.put("/plans/:id", [IsValidIdParams, validateReqParamsIdMatch], updatePlan);

/**
 * DELETE /api/plans/:id
 * Delete a plan
 * 
 * @param {string} id - The plan ID
 * @returns {Promise<Response>} 200 - Deletion success message.
 * @returns {Promise<Response>} 404 - Plan not found.
 */
router.delete("/plans/:id", IsValidIdParams, deletePlan);

// ============== PAYMENT ROUTES ==============

/**
 * GET /api/payments/all
 * Fetch all payments
 * 
 * @returns {Promise<Response>} 200 - An array of payments.
 * @returns {Promise<Response>} 500 - An error occurred.
 */
router.get("/payments/all", getAllPayments);

/**
 * GET /api/payments/:id
 * Fetch a payment by ID
 * 
 * @param {string} id - The payment ID
 * @returns {Promise<Response>} 200 - The payment object.
 * @returns {Promise<Response>} 404 - Payment not found.
 */
router.get("/payments/:id", IsValidIdParams, getPaymentById);

/**
 * POST /api/payments
 * Create a new payment
 * 
 * @returns {Promise<Response>} 201 - The created payment.
 * @returns {Promise<Response>} 400 - Validation error.
 */
router.post("/payments", createPayment);

/**
 * GET /api/payments/tenant/:tenantId
 * Get payments for a specific tenant
 * 
 * @param {string} tenantId - The tenant ID
 * @returns {Promise<Response>} 200 - An array of tenant payments.
 * @returns {Promise<Response>} 404 - Tenant not found.
 */
router.get("/payments/tenant/:tenantId", IsValidIdParams, getPaymentsByTenant);

export default router;
