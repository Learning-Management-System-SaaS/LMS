// src/middlewares/verifyToken.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createResponseObject } from "../utils/createResponseObject";
import { customRequest } from "../interfaces";
import { HttpError } from "../errors/httpError";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json(createResponseObject({ data: null, error: { message: "Unauthorized", details: "Authentication token is missing" } }));
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_ACCESS_TOKEN_SECRET;

    if (!secret) {
      throw new HttpError({ message: "JWT secret is missing in environment variables", statusCode: 500 });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded; // attach decoded user info to request

    next(); // continue to the next middleware/controller
    return
  } catch (err) {
    return res
      .status(403)
      .json(createResponseObject({ data: null, error: { message: "Forbidden", details: "Invalid or expired token" } }));
  }
};
