import winston from "winston";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { HttpError } from "../errors/httpError";
import {
  createpermissionDTO,
  updatePermissionDTO,
  permissionResponseDTO,
} from "../interfaces/permission";
import { handleDatabaseError } from "../utils/handleDatabaseErrors";

// Load environment variables from .env file
dotenv.config();

// Instantiate Prisma Client
const prisma = new PrismaClient();

export class PermissionService {
  /*
   * Retrieves all users from the database across all tenants
   * @returns An array of all users if successful, otherwise throws an error
   */
  public async getAllPermissions(): Promise<permissionResponseDTO[] | never> {
    try {
      return await prisma.permission.findMany({
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
   * Retrieves a single permission by its ID
   * @param roleId The ID of the permission to retrieve
   * @returns The permission if found, otherwise throws a 404 error
   */
  public async getPermissoinById({
    permissionId,
  }: {
    permissionId: number;
  }): Promise<permissionResponseDTO | never> {
    try {
      const permission = await prisma.permission.findUnique({
        where: { id: permissionId },
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
      if (!permission)
        throw new HttpError({ message: "Permission not found", statusCode: 404 });
      return permission;
    } catch (error) {
      console.log(error);
      winston.error("Error while retrieving permission in database service", error);
      handleDatabaseError("Could not retrieve permission", error);
    }
  }

  /**
   * Creates a new permission in the database
   * @param data The data to create a new permission
   * @returns The created permission if successful, otherwise throws an error
   */
  public async createPermission(
    data: createpermissionDTO
  ): Promise<permissionResponseDTO | never> {
    try {
      const normalizedData = {
        ...data,
        name: data.name ?? undefined,
      };
      return await prisma.permission.create({
        data: normalizedData,
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
    } catch (error) {
      handleDatabaseError("Could not create permission", error);
    }
  }

  /**
   * Updates a permission's details in the database
   * @param permissionId The ID of the permission to update
   * @param data The new data to update the permission with
   * @returns The updated permission if successful, otherwise throws an error
   */
  public async updatePermission(
    permissionId: number,
    data: updatePermissionDTO
  ): Promise<permissionResponseDTO | never> {
    try {
      const existingPermission = await prisma.permission.findUnique({
        where: { id: permissionId },
      });
      if (
        existingPermission &&
        existingPermission.updatedAt.toString() !== data.updatedAt.toString()
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

      const updatedPermission = await prisma.permission.update({
        where: { id: permissionId },
        select: {
          id: true,
          name: true,
          description: true,
        },
        data: normalizedData,
      });

      // Check if the update was unsuccessful
      if (!updatedPermission) {
        // Throw an error if the record does not exist
        throw new HttpError({ message: "permission not found", statusCode: 404 });
      }
      return updatedPermission;
    } catch (error) {
      handleDatabaseError("Could not update permission", error);
    }
  }

  /**
   * Deletes a permission from the database
   * @param permissionId The ID of the permission to delete
   * @returns The deleted permission if successful, otherwise throws an error
   */
  public async deletePermission(permissionId: number): Promise<permissionResponseDTO | never> {
    try {
      const deletedPermission = await prisma.permission.delete({
        where: { id: permissionId },
      });
      if (!deletedPermission)
        throw new HttpError({ message: "Permission not found", statusCode: 404 });
      return deletedPermission;
    } catch (error) {
      handleDatabaseError("Could not delete permission", error);
    }
  }
}
