import winston from "winston";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { HttpError } from "../errors/httpError";
import {
  createRoleDTO,
  updateRoleDTO,
  roleResponseDTO,
} from "../interfaces/roles";
import { handleDatabaseError } from "../utils/handleDatabaseErrors";
import { describe } from "node:test";

// Load environment variables from .env file
dotenv.config();

// Instantiate Prisma Client
const prisma = new PrismaClient();

export class RoleService {
  /*
   * Retrieves all users from the database across all tenants
   * @returns An array of all users if successful, otherwise throws an error
   */
  public async getAllRoles(): Promise<roleResponseDTO[] | never> {
    try {
      return await prisma.role.findMany({
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
    } catch (error) {
      handleDatabaseError("Could not retrieve users", error);
    }
  }

  /**
   * Retrieves a single role by its ID
   * @param roleId The ID of the role to retrieve
   * @returns The role if found, otherwise throws a 404 error
   */
  public async getRoleById({
    roleId,
  }: {
    roleId: number;
  }): Promise<roleResponseDTO | never> {
    try {
      const role = await prisma.role.findUnique({
        where: { id: roleId },
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
      if (!role)
        throw new HttpError({ message: "Role not found", statusCode: 404 });
      return role;
    } catch (error) {
      console.log(error);
      winston.error("Error while retrieving role in database service", error);
      handleDatabaseError("Could not retrieve role", error);
    }
  }

  /**
   * Creates a new role in the database
   * @param data The data to create a new role
   * @returns The created role if successful, otherwise throws an error
   */
  public async createRole(
    data: createRoleDTO
  ): Promise<roleResponseDTO | never> {
    try {
      const normalizedData = {
        ...data,
        name: data.name ?? undefined,
      };
      return await prisma.role.create({
        data: normalizedData,
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
    } catch (error) {
      handleDatabaseError("Could not create role", error);
    }
  }

  /**
   * Updates a role's details in the database
   * @param userId The ID of the role to update
   * @param data The new data to update the role with
   * @returns The updated role if successful, otherwise throws an error
   */
  public async updateRole(
    roleId: number,
    data: updateRoleDTO
  ): Promise<roleResponseDTO | never> {
    try {
      const existingRole = await prisma.role.findUnique({
        where: { id: roleId },
      });
      if (
        existingRole &&
        existingRole.updatedAt.toString() !== data.updatedAt.toString()
      ) {
        throw new HttpError({
          message:
            "Version conflict: The record has been modified by another process",
          statusCode: 409,
        });
      }

      const { updatedAt, ...newdata } = { ...data };
      const normalizedData = {
        name: newdata.name ?? undefined, // Convert null → undefined
        description: newdata.description ?? undefined, // Optional, if description is nullable
      };

      const updatedRole = await prisma.role.update({
        where: { id: roleId },
        select: {
          id: true,
          name: true,
          description: true,
        },
        data: normalizedData,
      });

      // Check if the update was unsuccessful
      if (!updatedRole) {
        // Throw an error if the record does not exist
        throw new HttpError({ message: "Role not found", statusCode: 404 });
      }
      return updatedRole;
    } catch (error) {
      handleDatabaseError("Could not update role", error);
    }
  }

  /**
   * Deletes a role from the database
   * @param userId The ID of the role to delete
   * @returns The deleted role if successful, otherwise throws an error
   */
  public async deleteRole(userId: number): Promise<roleResponseDTO | never> {
    try {
      const deletedUser = await prisma.role.delete({
        where: { id: userId },
      });
      if (!deletedUser)
        throw new HttpError({ message: "Role not found", statusCode: 404 });
      return deletedUser;
    } catch (error) {
      handleDatabaseError("Could not delete role", error);
    }
  }
}
