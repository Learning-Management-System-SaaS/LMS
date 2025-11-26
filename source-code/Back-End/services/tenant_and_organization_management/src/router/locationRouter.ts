import { Router } from "express";
import { getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation } from "../controllers/locationController";
import { validateRequestBody } from "../middlewares/validateRequestBody";
import { IsValidIdParams } from "../middlewares/IsValidIdParams";
import { validateReqParamsIdMatch } from "../middlewares/validateReqParamsIdMatch";

/**
 * Express router to handle location-related routes.
 *
 * This router provides the following routes:
 * - GET `/` - Fetch all locations.
 * - GET `/:id` - Fetch a location by ID.
 * - POST `/` - Create a new location.
 * - PUT `/:id` - Update a location by ID.
 * - DELETE `/:id` - Delete a location by ID.
 *
 * @module locationRouter
 * @type {Router}
 */
const router: Router = Router();

/**
 * GET /api/locations
 *
 * Fetch all locations from the database
 *
 * @route GET /api/locations
 * @group Locations - Operations related to locations
 * @access Public
 * @returns {Promise<Response>} 200 - An array of locations.
 * @returns {Promise<Response>} 500 - An error occurred while fetching locations.
 */
router.get("/", getAllLocations);

/**
 * GET /api/locations/:id
 *
 * Fetch a single location by its ID.
 *
 * @route GET /api/locations/:id
 * @group Locations - Operations related to locations
 * @access Public
 * @param {string} req.params.id - The ID of the location to fetch.
 * @returns {Promise<Response>} 200 - The location object if found.
 * @returns {Promise<Response>} 400 - Bad request: validation error.
 * @returns {Promise<Response>} 404 - Location not found.
 * @returns {Promise<Response>} 500 - An error occurred while fetching the location.
 */
router.get("/:id", IsValidIdParams, getLocationById);

/**
 * POST /api/locations
 *
 * Create a new location.
 *
 * @route POST /api/locations
 * @group Locations - Operations related to locations
 * @access Public
 * @param {object} req.body - The location data for creating a new location
 * @returns {Promise<Response>} 201 - The created location object.
 * @returns {Promise<Response>} 400 - Validation error, missing or incorrect location data.
 * @returns {Promise<Response>} 500 - An error occurred while creating the location.
 */
router.post("/", createLocation);

/**
 * PUT /api/locations/:id
 *
 * Update an existing location by its ID.
 *
 * @route PUT /api/locations/:id
 * @group Locations - Operations related to locations
 * @access Public
 * @param {string} req.params.id - The ID of the location to update.
 * @param {object} req.body - The updated location data.
 * @returns {Promise<Response>} 200 - The updated location object.
 * @returns {Promise<Response>} 400 - Validation error or ID mismatch.
 * @returns {Promise<Response>} 404 - Location not found.
 * @returns {Promise<Response>} 500 - An error occurred while updating the location.
 */
router.put("/:id", [IsValidIdParams, validateReqParamsIdMatch], updateLocation);

/**
 * DELETE /api/locations/:id
 *
 * Delete a location by its ID.
 *
 * @route DELETE /api/locations/:id
 * @group Locations - Operations related to locations
 * @access Public
 * @param {string} req.params.id - The ID of the location to delete.
 * @returns {Promise<Response>} 200 - A success message indicating the location was deleted.
 * @returns {Promise<Response>} 404 - Location not found.
 * @returns {Promise<Response>} 500 - An error occurred while deleting the location.
 */
router.delete("/:id", IsValidIdParams, deleteLocation);

export default router;
