import { Response } from "express";
import { LocationService } from "../services/locationService";
import { createLocationDTO, updateLocationDTO, locationResponseDTO } from "../interfaces/locations";
import { handleControllerError } from "../utils/handleContollerErrors";
import { createResponseObject } from "../utils/createResponseObject";
import { customRequest } from "../interfaces";
import { HttpError } from "../errors/httpError";

// Instantiate the location service
const locationService = new LocationService();

/**
 * Controller function to get all locations stored in the database
 * @param req customRequest object
 * @param res Express Response object
 * @returns A Express Response object with the retrieved locations
 */
export const getAllLocations = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const locations = await locationService.getAllLocations();
    return res.status(200).json(createResponseObject<locationResponseDTO>({ data: locations }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to retrieve locations" });
  }
};

/**
 * Controller function to get a location by its ID
 * @param req customRequest object containing the location ID in the path parameters
 * @param res Express Response object
 * @returns A Express Response object with the retrieved location
 */
export const getLocationById = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new HttpError({ message: "Location ID is missing in the request parameters", statusCode: 400 });

    const location = await locationService.getLocationById(id);
    return res.status(200).json(createResponseObject<locationResponseDTO>({ data: location }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to retrieve location" });
  }
};

/**
 * Controller function to create a new location
 * @param req customRequest object with location data in the body
 * @param res Express Response object
 * @returns A Express Response object with the created location
 */
export const createLocation = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const data: createLocationDTO = req.body;

    const location = await locationService.createLocation(data);
    return res.status(201).json(createResponseObject<locationResponseDTO>({ data: location }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to create location" });
  }
};

/**
 * Controller function to update a location
 * @param req customRequest object with location data in the body and ID in the path
 * @param res Express Response object
 * @returns A Express Response object with the updated location
 */
export const updateLocation = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const data: updateLocationDTO = req.body;
    const id = Number(req.params.id);

    if (!id) throw new HttpError({ message: "Location ID is missing in the request parameters", statusCode: 400 });
    if (data.id !== id) throw new HttpError({ message: "Location ID in body does not match URL parameter", statusCode: 400 });

    const location = await locationService.updateLocation(data);
    return res.status(200).json(createResponseObject<locationResponseDTO>({ data: location }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to update location" });
  }
};

/**
 * Controller function to delete a location
 * @param req customRequest object with location ID in the path parameters
 * @param res Express Response object
 * @returns A Express Response object with a success message
 */
export const deleteLocation = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new HttpError({ message: "Location ID is missing in the request parameters", statusCode: 400 });

    await locationService.deleteLocation(id);
    return res.status(200).json(createResponseObject({ data: { message: "Location deleted successfully", data: null } }));
  } catch (error) {
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to delete location" });
  }
};
