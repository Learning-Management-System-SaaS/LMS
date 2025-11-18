import { Role } from "@prisma/client";
import { makeNullFieldsOptional } from "../utils/typesUtilities";
import { auditingFields} from "../types/users";

//! When updating this file, and these interfaces
//! make sure validation schemas in `validations/userValidationSchemas.ts` are updated

/**
 * Base interface for the `User` entity.
 *
 * This interface extends the User model, making all nullable fields optional while preserving required fields.
 *
 * It is used as a base interface for various user-related operations.
 */
export interface roleBaseModel extends makeNullFieldsOptional<Role> {}

/**
 * Interface representing the Role structure used for database operations.
 *
 * This interface extends the `userBaseModel` interface but excludes auditing fields such as `createdAt`, `updatedAt`.
 *
 * It is typically used for creating or updating Role data where the auditing fields are handled by the system automatically.
 */
export interface roleDataWithoutAudit extends Omit<roleBaseModel, auditingFields> {}

// /**
//  * Interface representing the structure of Role data retrieved from the database.
//  *
//  * This interface extends `Role` and is typically used to hold Role data from the database.
// //  */
// export interface roleGetFromDatabaseDTO extends Role {}

/**
 * Interface representing the response structure for returning Role data via the API.
 *
 * This omits the password field from the data retrieved from the database.
 */
export interface roleResponseDTO extends Omit<Role, auditingFields> {
    id:number;
    name: string;
    description: string;
}

/**
 * Interface for creating a Role
 *
 * This interface is used to define the shape of the data passed to the controller for creating a new Role.
 *
 * It excludes fields such as `id`, `version`, and auditing fields (`createdAt`, `updatedAt`) as they are auto-generated.
 */
export interface createRoleDTO extends Omit<roleDataWithoutAudit, "id" | auditingFields> {}

/**
 * Interface for updating a Role used by the database service and controllers.
 *
 * This interface is used to define the shape of the data passed when updating an existing Role.
 * It extends `userBaseModel` but marks all fields as optional except `id` and `version` fields as required.
 */
export interface updateRoleDTO extends Partial<roleDataWithoutAudit> {
  id: number;
  updatedAt: Date;
}
