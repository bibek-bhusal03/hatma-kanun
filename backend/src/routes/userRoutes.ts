import { Router } from "express";
import {
  getAllUsers,
  getUserByEmailOrId,
  updateUserRole,
} from "../controllers/userController";
import { validateAccessToken } from "@baijanstack/express-auth";
import { checkPermissionsMiddleware } from "../middlewares/auth";
import { Role } from "../models/User";

const router = Router();

router.get(
  "/:id",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  getUserByEmailOrId
);
router.get(
  "/",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN],
  }),
  getAllUsers
);
router.put(
  "/:id/role",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  updateUserRole
);

export default router;
