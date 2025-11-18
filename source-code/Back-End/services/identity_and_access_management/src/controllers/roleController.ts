import { Response } from "express";
import { RoleService } from "../services/roleService";
import { createRoleDTO, roleResponseDTO, updateRoleDTO } from "../interfaces/roles";
import { handleControllerError } from "../utils/handleContollerErrors";
import { createResponseObject } from "../utils/createResponseObject";
import { customRequest } from "../interfaces";
import { getHashedPassword } from "../utils/verifyPassword";

// Instantiate the user service
const roleService = new RoleService();

/**
 * Controller function to get all users from across all tenants in the database
 *
 * It used by the SaaS Owner only
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns A Express Response object with the list of users
 */
export const getAllRoles = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    // Call the database service to retrieve all users
    const role = await roleService.getAllRoles();

    // Respond with the list of users
    return res.status(200).json(createResponseObject<roleResponseDTO>({ data: role }));
  } catch (error) {
    // Handle any errors that occur during the retrieval of users
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to retrieve users" });
  }
};



/**
 * Controller function to get a user by ID
 * @param req Express customRequest object containing the user ID in the path parameters
 * @param res Express Response object
 * @returns A Express Response object with the retrieved user
 */
export const getRole = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    // Extract user ID from customRequest parameters
    const roleId = Number(req.params.id);


    // Call the database service to get the user by ID
    const role = await roleService.getRoleById({ roleId });

    // Respond with the user data if found
    return res.status(200).json(createResponseObject<roleResponseDTO>({ data: role }));
  } catch (error) {
    // Handle any errors that occur during the retrieval of a user
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to retrieve user" });
  }
};

/**
 * Controller function to create a new user
 * @param req Express Request object
 * @param res Express Response object
 * @returns A Express Response object with the newly created user
 */
export const createRole = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    // Extract user data from request body
    const requestBody: createRoleDTO = req.body;


    // Call the database service to create a new user
    const newRole = await roleService.createRole(requestBody);

    // Respond with the newly created user data
    return res.status(201).json(createResponseObject<roleResponseDTO>({ data: newRole }));
  } catch (error) {
    // Handle any errors that occur during the creation of a user
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to create user" });
  }
};

/**
 * Controller function to update a user
 * @param req Express Request object containing the user ID in the path parameters
 * @param res Express Response object
 * @returns A Express Response object with the updated user
 */
export const updateRole = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    // Extract user ID and updated data from request
    const roleId = Number(req.params.id);

    // Extract user data from request parameters
    const updateData: updateRoleDTO = req.body;
    // Call the database service to update the user
    const updatedUser = await roleService.updateRole(roleId, updateData);
    return res.status(200).json(createResponseObject<roleResponseDTO>({ data: updatedUser }));
  } catch (error) {
    // Handle any errors that occur during the update of a user
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to update user" });
  }
};

/**
 * Controller function to delete a user
 * @param req Express Request object containing the user ID in the path parameters
 * @param res Express Response object
 * @returns A Express Response object with the deleted user
 */
export const deleteRole = async (req: customRequest, res: Response): Promise<Response> => {
  try {
    // Extract user ID from request parameters
    const roleId = Number(req.params.id);

    // Call the database service to delete the user
    const deletedRole = await roleService.deleteRole(roleId);
    return res.status(200).json(createResponseObject<roleResponseDTO>({ data: { message: "User deleted successfully", data: deletedRole } }));
  } catch (error) {
    // Handle any errors that occur during the deletion of a user
    return handleControllerError({ res, error, defaultErrorMessage: "Failed to delete user" });
  }
};
