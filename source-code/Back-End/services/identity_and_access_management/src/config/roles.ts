// Export all permissions together for easy access
export const ROLES = {
  SAAS_OWNER: "admin",
  TENANT_OWNER:"tadmin",
  DIVISION_ADMIN:"dadmin",
  INSTRUCTOR: "instructor",
  STUDENT:"student",
  USER: "user",
};
// Create a union type for permissions based on PERMISSIONS values
export type rolesTypes = (typeof ROLES)[keyof typeof ROLES];

export const ROLES_ARRAY: rolesTypes[] = Object.values(ROLES);
