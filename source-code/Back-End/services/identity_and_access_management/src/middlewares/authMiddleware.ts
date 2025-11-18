import { Response, NextFunction } from "express";
import { createResponseObject } from "../utils/createResponseObject";
import { extractTokenFromHeader, verifyToken } from "../utils/jwt";
import { isValidTenantId } from "../utils/isValidTenantId";
import { HttpError } from "../errors/httpError";
import { customRequest } from "../interfaces";
import { ROLES } from "../config/roles";

export const authMiddleware = async (req: customRequest, res: Response, next: NextFunction) => {
   
    const token = req.cookies.auth_token

try {
    const decodedToken = verifyToken({
      token,
      secret: process.env.JWT_SECRET,
    });

    
    // Determine where the tenantId should come from based on the user role
    const tenantDivisionId = decodedToken.userRole === ROLES.SAAS_OWNER ? "" : decodedToken.tenantDivisionId;

    // // check the tenantId if user is not a saasOwner
    if (decodedToken.userRole !== ROLES.SAAS_OWNER) {
      await isValidTenantId(tenantDivisionId, token);
    }

    // // check the tenantId if it is present in the request body and user is saasOwner
    // if (decodedToken.userRole === ROLES.SAAS_OWNER && req.body.tenantId) {
    //   await isValidTenantId(tenantId, token, true);
    // }
    req.user = { tenantDivisionId: Number(tenantDivisionId), userRole: decodedToken.userRole, permissions: decodedToken.permissions, token };

    return next(); // Pass control to the next middleware/handler
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode || 401).json(({ error: { message: "Unauthorized", details: error.message } }));
    }
    return res.status(401).json(({ error: { message: "Unauthorized" } }));
  }
};

