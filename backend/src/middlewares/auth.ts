import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userRepo } from "../repositories/userRepo"; // adjust path as needed

interface DecodedAccessToken {
  email: string;
  [key: string]: any; // extendable if you decode more fields from JWT
}

declare global {
  namespace Express {
    interface Request {
      decodedAccessToken?: DecodedAccessToken;
    }
  }
}

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
      if (apiPermissions.includes(user.role)) {
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
