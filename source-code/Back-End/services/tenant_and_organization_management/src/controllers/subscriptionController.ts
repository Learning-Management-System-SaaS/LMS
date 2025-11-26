import { Response } from "express";
import { SubscriptionService } from "../services/subscriptionService";
import { 
  createSubscriptionDTO, 
  updateSubscriptionDTO, 
  subscriptionResponseDTO,
  createPlanDTO,
  updatePlanDTO,
  planResponseDTO,
  createPaymentDTO,
  paymentResponseDTO
} from "../interfaces/subscriptions";
import { handleControllerError } from "../utils/handleContollerErrors";
import { createResponseObject } from "../utils/createResponseObject";
import { customRequest } from "../interfaces";
import { HttpError } from "../errors/httpError";

const subscriptionService = new SubscriptionService();

// ============== SUBSCRIPTION ENDPOINTS ==============

/**
 * Get all subscriptions
 */
export const getAllSubscriptions = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    return res.status(200).json(createResponseObject<subscriptionResponseDTO>({ data: subscriptions }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to retrieve subscriptions" });
  }
};

/**
 * Get subscription by ID
 */
export const getSubscriptionById = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new HttpError({ message: "Subscription ID is missing", statusCode: 400 });

    const subscription = await subscriptionService.getSubscriptionById(id);
    return res.status(200).json(createResponseObject<subscriptionResponseDTO>({ data: subscription }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to retrieve subscription" });
  }
};

/**
 * Create a new subscription
 */
export const createSubscription = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const data: createSubscriptionDTO = req.body;
    const subscription = await subscriptionService.createSubscription(data);
    return res.status(201).json(createResponseObject<subscriptionResponseDTO>({ data: subscription }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to create subscription" });
  }
};

/**
 * Update subscription
 */
export const updateSubscription = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const data: updateSubscriptionDTO = req.body;
    const id = Number(req.params.id);

    if (!id) throw new HttpError({ message: "Subscription ID is missing", statusCode: 400 });
    if (data.id !== id) throw new HttpError({ message: "ID in body does not match URL parameter", statusCode: 400 });

    const subscription = await subscriptionService.updateSubscription(data);
    return res.status(200).json(createResponseObject<subscriptionResponseDTO>({ data: subscription }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to update subscription" });
  }
};

/**
 * Delete subscription
 */
export const deleteSubscription = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new HttpError({ message: "Subscription ID is missing", statusCode: 400 });

    await subscriptionService.deleteSubscription(id);
    return res.status(200).json(createResponseObject({ data: { message: "Subscription deleted successfully", data: null } }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to delete subscription" });
  }
};

// ============== PLAN ENDPOINTS ==============

/**
 * Get all plans
 */
export const getAllPlans = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const plans = await subscriptionService.getAllPlans();
    return res.status(200).json(createResponseObject<planResponseDTO>({ data: plans }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to retrieve plans" });
  }
};

/**
 * Get plan by ID
 */
export const getPlanById = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new HttpError({ message: "Plan ID is missing", statusCode: 400 });

    const plan = await subscriptionService.getPlanById(id);
    return res.status(200).json(createResponseObject<planResponseDTO>({ data: plan }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to retrieve plan" });
  }
};

/**
 * Create a new plan
 */
export const createPlan = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const data: createPlanDTO = req.body;
    const plan = await subscriptionService.createPlan(data);
    return res.status(201).json(createResponseObject<planResponseDTO>({ data: plan }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to create plan" });
  }
};

/**
 * Update plan
 */
export const updatePlan = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const data: updatePlanDTO = req.body;
    const id = Number(req.params.id);

    if (!id) throw new HttpError({ message: "Plan ID is missing", statusCode: 400 });
    if (data.id !== id) throw new HttpError({ message: "ID in body does not match URL parameter", statusCode: 400 });

    const plan = await subscriptionService.updatePlan(data);
    return res.status(200).json(createResponseObject<planResponseDTO>({ data: plan }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to update plan" });
  }
};

/**
 * Delete plan
 */
export const deletePlan = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new HttpError({ message: "Plan ID is missing", statusCode: 400 });

    await subscriptionService.deletePlan(id);
    return res.status(200).json(createResponseObject({ data: { message: "Plan deleted successfully", data: null } }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to delete plan" });
  }
};

// ============== PAYMENT ENDPOINTS ==============

/**
 * Get all payments
 */
export const getAllPayments = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const payments = await subscriptionService.getAllPayments();
    return res.status(200).json(createResponseObject<paymentResponseDTO>({ data: payments }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to retrieve payments" });
  }
};

/**
 * Get payment by ID
 */
export const getPaymentById = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new HttpError({ message: "Payment ID is missing", statusCode: 400 });

    const payment = await subscriptionService.getPaymentById(id);
    return res.status(200).json(createResponseObject<paymentResponseDTO>({ data: payment }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to retrieve payment" });
  }
};

/**
 * Create a new payment
 */
export const createPayment = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const data: createPaymentDTO = req.body;
    const payment = await subscriptionService.createPayment(data);
    return res.status(201).json(createResponseObject<paymentResponseDTO>({ data: payment }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to create payment" });
  }
};

/**
 * Get payments by tenant
 */
export const getPaymentsByTenant = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const tenantId = Number(req.params.tenantId);
    if (!tenantId) throw new HttpError({ message: "Tenant ID is missing", statusCode: 400 });

    const payments = await subscriptionService.getPaymentsByTenant(tenantId);
    return res.status(200).json(createResponseObject<paymentResponseDTO>({ data: payments }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to retrieve tenant payments" });
  }
};
