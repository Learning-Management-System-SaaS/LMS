import winston from "winston";
import dotenv from "dotenv";
import { HttpError } from "../errors/httpError";
import { divisionResponseDTO, updateDivisionDTO, createDivisionRequestDTO, divisionBaseModel } from "../interfaces/divisions";
import { handleDatabaseError } from "../utils/handleDatabaseErrors";
import { PrismaClient} from "@prisma/client";
import { Division } from "../interfaces/divisions";

// Load environment variables from .env file
dotenv.config();

// Instantiate Prisma Client
const prisma = new PrismaClient();

export class DivisionService {
  getTenantDivisionList(id: number) {
    throw new Error("Method not implemented.");
  }
  getTenantDivisionHierarchy(id: number) {
    throw new Error("Method not implemented.");
  }
  /**
   * Retrieves all users from the database across all tenants
   * @returns An array of all users if successful, otherwise throws an error
   */
  public async getAllDivition(): Promise<divisionResponseDTO[] | never> {
    try {
      const divisions = await prisma.division.findMany();
      return divisions
    } catch (error) {
      handleDatabaseError("Could not retrieve users", error);
    }
  }
  /**
   * Retrieves all users from the database
   * @returns An array of all users in the database if successful, otherwise throws an error
   */
  public async getDivision(tenantId: number): Promise<divisionResponseDTO[] | never> {
    try {
      return await prisma.division.findMany({
        where: { tenantId },
      });
    } catch (error) {
      handleDatabaseError("Could not retrieve users", error);
    }
  }

  /**
   * Retrieves a single user by its ID
   * @param DivisionId The ID of the user to retrieve
   * @returns The user if found, otherwise throws a 404 error
   */
   public async getDivisionById({ DivisionId, tenantId }: { tenantId: number; DivisionId: number }): Promise<Division | never> {
    try {
      const Division = await prisma.division.findUnique({
        where: { id: DivisionId, tenantId },
      });
      if (!Division) throw new HttpError({ message: "User not found", statusCode: 404 });      
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
  public async createDivision(data: createDivisionRequestDTO): Promise<divisionResponseDTO | never> {
    try {
      return await prisma.division.create({
        data,

      });
    } catch (error) {
      handleDatabaseError("Could not create user", error);
    }
  }

  /**
   * Updates a user's details in the database
   * @param DivisionId The ID of the user to update
   * @param data The new data to update the user with
   * @returns The updated user if successful, otherwise throws an error
   */
  public async updateDivision(DivisionId: number, data: updateDivisionDTO): Promise<divisionResponseDTO | never> {
    try {
      const existingDivision = await prisma.division.findUnique({ where: { id: DivisionId } });
      if (existingDivision && existingDivision.updatedAt.toString() !== data.updatedAt.toString()) {
        throw new HttpError({ message: "Version conflict: The record has been modified by another process", statusCode: 409 });
      }

      const { updatedAt, ...newdata } = { ...data };
      const updatedDivision = await prisma.division.update({
        where: { id: DivisionId },
        data: newdata,
      });
      // Check if the update was unsuccessful
      if (!updatedDivision) {
        // Throw an error if the record does not exist
        throw new HttpError({ message: "User not found", statusCode: 404 });
      }
      return updatedDivision;
    } catch (error) {
      handleDatabaseError("Could not update Division", error);
    }
  }

  /**
   * Deletes a user from the database
   * @param DivisionId The ID of the user to delete
   * @returns The deleted user if successful, otherwise throws an error
   */
  public async deleteDivision(DivisionId: number): Promise<divisionResponseDTO | never> {
    try {
      const deletedDivision = await prisma.division.delete({
        where: { id: DivisionId },
      });
      if (!deletedDivision) throw new HttpError({ message: "User not found", statusCode: 404 });
      return deletedDivision;
    } catch (error) {
      handleDatabaseError("Could not delete user", error);
    }
  }

  /**
   * Retrieves a user by tenantId and email or username.
   * Determines if the emailOrUsername is an email or username,
   *
   * @param tenantId The ID of the tenant to which the user belongs.
   * @param emailOrDivisionName The email or username of the user.
   * @returns The User object if found, null if not found, or throws an error if retrieval fails.
   * @throws {HttpError} if there is an error retrieving the user from the database.
   */
//  public async loginDivision({ tenantId, emailOrDivisionName }: { tenantId: number; emailOrUsername: string }): Promise<Division | null | never> {
//     try {
//       const isEmail = emailOrDivisionName.includes("@");
//       const whereClause = isEmail
//         ? { tenantId_email: { tenantId, email: emailOrDivisionName } } // For tenantId + email
//         : { tenantId_username: { tenantId, username: emailOrDivisionName } }; // For tenantId + username
//       const Division = await prisma.division.findUnique({ where: whereClause });

    
//     } catch (error) {
//       handleDatabaseError("Could not retrieve user", error);
//     }
//  
}