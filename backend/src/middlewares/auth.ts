import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userRepo } from "../repositories/userRepo";
import { Role } from "../models/User";

/**
 * Middleware to check if the user has required permissions/roles
 * @param apiPermissions Array of roles or permissions (e.g. ["admin"])
 */
export const checkPermissionsMiddleware = ({
  apiPermissions,
}: {
  apiPermissions: string[];
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.decodedAccessToken?.email) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Unauthorized: Missing decoded token",
        });
      }

      const { email } = req.decodedAccessToken;
      const user = await userRepo.findByEmail(email);

      if (!user) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Failed to fetch user",
        });
      }

      // Check if user role matches at least one of the required permissions
      if (apiPermissions.includes(user.role as Role)) {
        return next();
      }

      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Forbidden: Invalid Permissions",
      });
    } catch (error) {
      console.error("Permission check failed:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong while checking permissions",
      });
    }
  };
};
