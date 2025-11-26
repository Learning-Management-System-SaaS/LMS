import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { HttpError } from "../errors/httpError";
import { handleDatabaseError } from "../utils/handleDatabaseErrors";
import { createLocationDTO, updateLocationDTO, locationResponseDTO } from "../interfaces/locations";

dotenv.config();

const prisma = new PrismaClient();

export class LocationService {
  /**
   * Retrieves all locations stored in the database
   * @returns List of all locations if found, otherwise throws an error
   */
  public async getAllLocations(): Promise<locationResponseDTO[] | never> {
    try {
      const locations = await prisma.location.findMany({});
      return locations;
    } catch (error) {
      handleDatabaseError("Could not retrieve locations", error);
    }
  }

  /**
   * Retrieves a single location by its ID
   * @param id The ID of the location to retrieve
   * @returns The location if found, otherwise throws a 404 error
   */
  public async getLocationById(id: number): Promise<locationResponseDTO | never> {
    try {
      const location = await prisma.location.findUnique({ where: { id } });

      if (!location) {
        throw new HttpError({ message: `Location with id: ${id} not found`, statusCode: 404 });
      }

      return location;
    } catch (error) {
      handleDatabaseError("Could not retrieve location", error);
    }
  }

  /**
   * Creates a new location in the database
   * @param data The location data to create
   * @returns The created location if successful, otherwise throws an error
   */
  public async createLocation(data: createLocationDTO): Promise<locationResponseDTO | never> {
    try {
      const location = await prisma.location.create({ data });
      return location;
    } catch (error) {
      handleDatabaseError("Could not create location", error);
    }
  }

  /**
   * Updates an existing location
   * @param data The updated location data
   * @returns The updated location if successful, otherwise throws an error
   */
  public async updateLocation(data: updateLocationDTO): Promise<locationResponseDTO | never> {
    try {
      // Verify location exists
      const existingLocation = await prisma.location.findUnique({ where: { id: data.id } });
      if (!existingLocation) {
        throw new HttpError({ message: `Location with id: ${data.id} not found`, statusCode: 404 });
      }

      const { id, ...updateData } = data;
      const location = await prisma.location.update({ where: { id }, data: updateData });

      return location;
    } catch (error) {
      handleDatabaseError("Could not update location", error);
    }
  }

  /**
   * Deletes a location from the database
   * @param id The ID of the location to delete
   * @returns Success message if deleted, otherwise throws an error
   */
  public async deleteLocation(id: number): Promise<void | never> {
    try {
      // Verify location exists
      const location = await prisma.location.findUnique({ where: { id } });
      if (!location) {
        throw new HttpError({ message: `Location with id: ${id} not found`, statusCode: 404 });
      }

      await prisma.location.delete({ where: { id } });
    } catch (error) {
      handleDatabaseError("Could not delete location", error);
    }
  }
}
