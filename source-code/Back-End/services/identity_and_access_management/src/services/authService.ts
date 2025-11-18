import { Prisma, PrismaClient, User } from "@prisma/client";
import { HttpError } from "../errors/httpError";
import { createUserDTO, updateUserDTO, userResponseDTO } from "../interfaces/users";
import { handleDatabaseError } from "../utils/handleDatabaseErrors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Instantiate Prisma Client
const prisma = new PrismaClient();

export class AuthService {

      /**
   * Retrieves a user by tenantDivisionId and email or username.
   * Determines if the emailOrUsername is an email or username,
   *
   * @param tenantDivisionId The ID of the tenant to which the user belongs.
   * @param emailOrUsername The email or username of the user.
   * @returns The User object if found, null if not found, or throws an error if retrieval fails.
   * @throws {HttpError} if there is an error retrieving the user from the database.
   */

 public async loginUser({ email }: { email: string }): Promise<User | null | never> {
  try {
    const user = await prisma.user.findFirst({
      where:
         { email }
        
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
