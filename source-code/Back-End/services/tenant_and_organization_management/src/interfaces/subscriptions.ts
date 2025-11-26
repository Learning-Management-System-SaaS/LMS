import { Subscription, Plan, Payment } from "@prisma/client";

// ============== SUBSCRIPTION DTOs ==============

export interface createSubscriptionDTO {
  susbscriptonStatus: "TRIAL" | "ACTIVE" | "INACTIVE" | "SUSPENDED" | "CANCELLED";
  plan_id: number;
}

export interface updateSubscriptionDTO extends createSubscriptionDTO {
  id: number;
}

export interface subscriptionResponseDTO extends Subscription {}

// ============== PLAN DTOs ==============

export interface createPlanDTO {
  plantype?: "FREE" | "BASIC" | "STANDARD" | "PRO";
  price: number;
  billingCycle: string;
  currency: string;
}

export interface updatePlanDTO extends createPlanDTO {
  id: number;
}

export interface planResponseDTO extends Plan {}

// ============== PAYMENT DTOs ==============

export interface createPaymentDTO {
  tenantId: number;
  subscriptionId: number;
  status: "COMPLETED" | "FAILED" | "PENDING" | "REFUNDED" | "CANCELLED";
  paymentMethod: string;
  cardNumber: number;
}

export interface paymentResponseDTO extends Payment {}
