import winston from "winston";
import dotenv from "dotenv";
import {  PrismaClient, User } from "@prisma/client";
import { HttpError } from "../errors/httpError";
import { createUserDTO, updateUserDTO, userResponseDTO } from "../interfaces/users";
import { handleDatabaseError } from "../utils/handleDatabaseErrors";
import { number } from "joi";

// Load environment variables from .env file
dotenv.config();

// Instantiate Prisma Client
const prisma = new PrismaClient();

export class UserService {
  /**
   * Retrieves all users from the database across all tenants
   * @returns An array of all users if successful, otherwise throws an error
   */
  public async getAllUsers(): Promise<userResponseDTO[] | never> {
    try {
      return await prisma.user.findMany({
        select: {
          id: true,
          tenantDivisionId: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          address: true,
          gender: true,
          birthday: true,
          profileImageUrl: true, 
          permissions:true,
          userRole:true,
          roleId:true,
          createdAt:true,
          updatedAt:true
        },
      });
    } catch (error) {
      handleDatabaseError("Could not retrieve users", error);
    }
  }
  /**
   * Retrieves all users from the database
   * @returns An array of all users in the database if successful, otherwise throws an error
   */
  public async getUsers(tenantDivisionId: number): Promise<userResponseDTO[] | never> {
    try {
      return await prisma.user.findMany({
        where: { tenantDivisionId},
        select: {
          id: true,
          tenantDivisionId: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          address: true,
          gender: true,
          birthday: true,
          profileImageUrl: true, 
          permissions:true,
          userRole:true,
          roleId:true,
          createdAt:true,
          updatedAt:true
        },
      });
    } catch (error) {
      handleDatabaseError("Could not retrieve users", error);
    }
  }

  /**
   * Retrieves a single user by its ID
   * @param userId The ID of the user to retrieve
   * @returns The user if found, otherwise throws a 404 error
   */
  public async getUserById({ userId}: { userId: number }): Promise<userResponseDTO | never> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId},
        select: {
          id: true,
          tenantDivisionId: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          address: true,
          gender: true,
          birthday: true,
          profileImageUrl: true, 
          permissions:true,
          userRole:true,
          roleId:true,
          createdAt:true,
          updatedAt:true
        },
      });
      if (!user) throw new HttpError({ message: "User not found", statusCode: 404 });
      return user;
    } catch (error) {
      console.log(error);
      winston.error("Error while retrieving user in database service", error);
      handleDatabaseError("Could not retrieve user", error);
    }
  }

  /**
   * Creates a new user in the database
   * @param data The data to create a new user
   * @returns The created user if successful, otherwise throws an error
   */
  public async createUser(data: createUserDTO): Promise<userResponseDTO | never> {
    try {
       const normalizedData = {
      ...data,
      permissions: data.permissions ?? undefined,
      };
      return await prisma.user.create({
        data: normalizedData,
        select: {
          id: true,
          tenantDivisionId: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          address: true,
          gender: true,
          birthday: true,
          profileImageUrl: true, 
          permissions:true,
          userRole:true,
          roleId:true,
          createdAt:true,
          updatedAt:true
        },
      });
    } catch (error) {
      handleDatabaseError("Could not create user", error);
    }
  }

  /**
   * Updates a user's details in the database
   * @param userId The ID of the user to update
   * @param data The new data to update the user with
   * @returns The updated user if successful, otherwise throws an error
   */
  public async updateUser(userId: number, data: updateUserDTO): Promise<userResponseDTO | never> {
    try {
      const existingUser = await prisma.user.findUnique({ where: { id: userId } });
      if (existingUser && existingUser.updatedAt.toString() !== data.updatedAt.toString()) {
        throw new HttpError({ message: "Version conflict: The record has been modified by another process", statusCode: 409 });
      }

      const { updatedAt, ...newdata } = { ...data };
      const normalizedData = {
      ...newdata,
      permissions: newdata.permissions ?? undefined, // Convert null → undefined
      userRole: newdata.userRole ?? undefined,       // Optional, if userRole is nullable
    };

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        select: {
          id: true,
          tenantDivisionId: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          address: true,
          gender: true,
          birthday: true,
          profileImageUrl: true, 
          permissions:true,
          userRole:true,
          roleId:true,
          createdAt:true,
          updatedAt:true
        },
        data: normalizedData,
      });

      // Check if the update was unsuccessful
      if (!updatedUser) {
        // Throw an error if the record does not exist
        throw new HttpError({ message: "User not found", statusCode: 404 });
      }
      return updatedUser;
    } catch (error) {
      handleDatabaseError("Could not update user", error);
    }
  }

  /**
   * Deletes a user from the database
   * @param userId The ID of the user to delete
   * @returns The deleted user if successful, otherwise throws an error
   */
  public async deleteUser(userId: number): Promise<userResponseDTO | never> {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: userId },
        
      });
      if (!deletedUser) throw new HttpError({ message: "User not found", statusCode: 404 });
      return deletedUser;
    } catch (error) {
      handleDatabaseError("Could not delete user", error);
    }
  }

  /**
   * Retrieves a user by tenantDivisionId and email or username.
   * Determines if the emailOrUsername is an email or username,
   *
   * @param tenantDivisionId The ID of the tenant to which the user belongs.
   * @param emailOrUsername The email or username of the user.
   * @returns The User object if found, null if not found, or throws an error if retrieval fails.
   * @throws {HttpError} if there is an error retrieving the user from the database.
   */
 public async loginUser({ emailOrUsername }: { emailOrUsername: string }): Promise<User | null | never> {
  try {
    

    const user = await prisma.user.findFirst({
      where:
         { email: emailOrUsername }
        
    });
    return user;
  } catch (error) {
    handleDatabaseError("Could not retrieve user", error);
  }
}
  public async getUserRefreshToken({ userId }: { userId: number }): Promise<string | null | undefined | never> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      return user?.refreshToken;
    } catch (error) {
      handleDatabaseError("Could not retrive user refresh token", error);
    }
  }
  /**
   * Stores the refresh token for a user in the database.
   * @param tenantDivisionId The ID of the tenant to which the user belongs.
   * @param userId The ID of the user for whom the refresh token is being stored.
   * @param refreshToken The refresh token to store.
   * @throws {HttpError} if there is an error updating the refresh token.
   */
  public async storeUserRefreshToken({ tenantDivisionId, userId, refreshToken }: { tenantDivisionId: number; userId: number; refreshToken: string }) {
    try {
      await prisma.user.update({
        where: { tenantDivisionId, id: userId },
        data: { refreshToken },
      });
    } catch (error) {
      handleDatabaseError("Could not update user refresh token", error);
    }
  }

  /**
   * Deletes the refresh token for a user.
   * @param tenantDivisionId The ID of the tenant to which the user belongs.
   * @param userId The ID of the user to delete the refresh token for.
   * @param refreshToken The refresh token to delete.
   * @throws {HttpError} if there is an error deleting the refresh token.
   */
  public async deleteUserRefreshToken({ tenantDivisionId, userId }: { tenantDivisionId: number; userId: number; refreshToken: string }) {
    try {
      await prisma.user.update({
        where: { tenantDivisionId, id: userId },
        data: { refreshToken: null },
      });
    } catch (error) {
      handleDatabaseError("Could not delete user refresh token", error);
    }
  }
}
