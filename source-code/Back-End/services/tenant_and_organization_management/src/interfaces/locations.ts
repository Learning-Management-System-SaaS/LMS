import { Location } from "@prisma/client";

/**
 * Data Transfer Object for creating a location
 */
export interface createLocationDTO {
  country?: string;
  city?: string;
  state?: string;
  street?: string;
  postalCode?: string;
}

/**
 * Data Transfer Object for updating a location
 */
export interface updateLocationDTO extends createLocationDTO {
  id: number;
}

/**
 * Data Transfer Object for location response
 */
export interface locationResponseDTO extends Location {}
