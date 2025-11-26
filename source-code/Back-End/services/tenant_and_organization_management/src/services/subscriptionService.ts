import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { HttpError } from "../errors/httpError";
import { handleDatabaseError } from "../utils/handleDatabaseErrors";
import {
  createSubscriptionDTO,
  updateSubscriptionDTO,
  subscriptionResponseDTO,
  createPlanDTO,
  updatePlanDTO,
  planResponseDTO,
  createPaymentDTO,
  paymentResponseDTO,
} from "../interfaces/subscriptions";

dotenv.config();

const prisma = new PrismaClient();

export class SubscriptionService {
  // ============== SUBSCRIPTION METHODS ==============

  public async getAllSubscriptions(): Promise<subscriptionResponseDTO[] | never> {
    try {
      const subscriptions = await prisma.subscription.findMany({
        include: { plan: true, Tenant: true, payments: true },
      });
      return subscriptions;
    } catch (error) {
      handleDatabaseError("Could not retrieve subscriptions", error);
    }
  }

  public async getSubscriptionById(id: number): Promise<subscriptionResponseDTO | never> {
    try {
      const subscription = await prisma.subscription.findUnique({
        where: { id },
        include: { plan: true, Tenant: true, payments: true },
      });

      if (!subscription) {
        throw new HttpError({ message: `Subscription with id: ${id} not found`, statusCode: 404 });
      }

      return subscription;
    } catch (error) {
      handleDatabaseError("Could not retrieve subscription", error);
    }
  }

  public async createSubscription(data: createSubscriptionDTO): Promise<subscriptionResponseDTO | never> {
    try {
      // Verify plan exists
      const plan = await prisma.plan.findUnique({ where: { id: data.plan_id } });
      if (!plan) {
        throw new HttpError({ message: `Plan with id: ${data.plan_id} not found`, statusCode: 400 });
      }

      const subscription = await prisma.subscription.create({
        data,
        include: { plan: true, Tenant: true, payments: true },
      });

      return subscription;
    } catch (error) {
      handleDatabaseError("Could not create subscription", error);
    }
  }

  public async updateSubscription(data: updateSubscriptionDTO): Promise<subscriptionResponseDTO | never> {
    try {
      // Verify subscription exists
      const existingSubscription = await prisma.subscription.findUnique({ where: { id: data.id } });
      if (!existingSubscription) {
        throw new HttpError({ message: `Subscription with id: ${data.id} not found`, statusCode: 404 });
      }

      // Verify plan exists if being updated
      if (data.plan_id) {
        const plan = await prisma.plan.findUnique({ where: { id: data.plan_id } });
        if (!plan) {
          throw new HttpError({ message: `Plan with id: ${data.plan_id} not found`, statusCode: 400 });
        }
      }

      const { id, ...updateData } = data;
      const subscription = await prisma.subscription.update({
        where: { id },
        data: updateData,
        include: { plan: true, Tenant: true, payments: true },
      });

      return subscription;
    } catch (error) {
      handleDatabaseError("Could not update subscription", error);
    }
  }

  public async deleteSubscription(id: number): Promise<void | never> {
    try {
      const subscription = await prisma.subscription.findUnique({ where: { id } });
      if (!subscription) {
        throw new HttpError({ message: `Subscription with id: ${id} not found`, statusCode: 404 });
      }

      await prisma.subscription.delete({ where: { id } });
    } catch (error) {
      handleDatabaseError("Could not delete subscription", error);
    }
  }

  // ============== PLAN METHODS ==============

  public async getAllPlans(): Promise<planResponseDTO[] | never> {
    try {
      const plans = await prisma.plan.findMany({ include: { Subscription: true } });
      return plans;
    } catch (error) {
      handleDatabaseError("Could not retrieve plans", error);
    }
  }

  public async getPlanById(id: number): Promise<planResponseDTO | never> {
    try {
      const plan = await prisma.plan.findUnique({
        where: { id },
        include: { Subscription: true },
      });

      if (!plan) {
        throw new HttpError({ message: `Plan with id: ${id} not found`, statusCode: 404 });
      }

      return plan;
    } catch (error) {
      handleDatabaseError("Could not retrieve plan", error);
    }
  }

  public async createPlan(data: createPlanDTO): Promise<planResponseDTO | never> {
    try {
      const plan = await prisma.plan.create({
        data: {
          ...data,
          price: new Decimal(data.price),
        },
        include: { Subscription: true },
      });

      return plan;
    } catch (error) {
      handleDatabaseError("Could not create plan", error);
    }
  }

  public async updatePlan(data: updatePlanDTO): Promise<planResponseDTO | never> {
    try {
      const existingPlan = await prisma.plan.findUnique({ where: { id: data.id } });
      if (!existingPlan) {
        throw new HttpError({ message: `Plan with id: ${data.id} not found`, statusCode: 404 });
      }

      const { id, ...updateData } = data;
      const plan = await prisma.plan.update({
        where: { id },
        data: {
          ...updateData,
          price: new Decimal(updateData.price),
        },
        include: { Subscription: true },
      });

      return plan;
    } catch (error) {
      handleDatabaseError("Could not update plan", error);
    }
  }

  public async deletePlan(id: number): Promise<void | never> {
    try {
      const plan = await prisma.plan.findUnique({ where: { id } });
      if (!plan) {
        throw new HttpError({ message: `Plan with id: ${id} not found`, statusCode: 404 });
      }

      await prisma.plan.delete({ where: { id } });
    } catch (error) {
      handleDatabaseError("Could not delete plan", error);
    }
  }

  // ============== PAYMENT METHODS ==============

  public async getAllPayments(): Promise<paymentResponseDTO[] | never> {
    try {
      const payments = await prisma.payment.findMany({
        include: { tenant: true, subscription: true },
      });
      return payments;
    } catch (error) {
      handleDatabaseError("Could not retrieve payments", error);
    }
  }

  public async getPaymentById(id: number): Promise<paymentResponseDTO | never> {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id },
        include: { tenant: true, subscription: true },
      });

      if (!payment) {
        throw new HttpError({ message: `Payment with id: ${id} not found`, statusCode: 404 });
      }

      return payment;
    } catch (error) {
      handleDatabaseError("Could not retrieve payment", error);
    }
  }

  public async createPayment(data: createPaymentDTO): Promise<paymentResponseDTO | never> {
    try {
      // Verify tenant exists
      const tenant = await prisma.tenant.findUnique({ where: { id: data.tenantId } });
      if (!tenant) {
        throw new HttpError({ message: `Tenant with id: ${data.tenantId} not found`, statusCode: 400 });
      }

      // Verify subscription exists
      const subscription = await prisma.subscription.findUnique({ where: { id: data.subscriptionId } });
      if (!subscription) {
        throw new HttpError({ message: `Subscription with id: ${data.subscriptionId} not found`, statusCode: 400 });
      }

      const payment = await prisma.payment.create({
        data,
        include: { tenant: true, subscription: true },
      });

      return payment;
    } catch (error) {
      handleDatabaseError("Could not create payment", error);
    }
  }

  public async getPaymentsByTenant(tenantId: number): Promise<paymentResponseDTO[] | never> {
    try {
      // Verify tenant exists
      const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
      if (!tenant) {
        throw new HttpError({ message: `Tenant with id: ${tenantId} not found`, statusCode: 404 });
      }

      const payments = await prisma.payment.findMany({
        where: { tenantId },
        include: { tenant: true, subscription: true },
      });

      return payments;
    } catch (error) {
      handleDatabaseError("Could not retrieve tenant payments", error);
    }
  }
}
