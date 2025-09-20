import { Router } from "express";
import {
  createSifarisType,
  getSifarisTypes,
  getSifarisTypeById,
  updateSifarisType,
  deleteSifarisType,
} from "../controllers/sifarisController";
import { validateAccessToken } from "@baijanstack/express-auth";
import { checkPermissionsMiddleware } from "../middlewares/auth";
import { Role } from "../models/User";

const router = Router();

router.post(
  "/",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  createSifarisType
);
router.get(
  "/",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  getSifarisTypes
);
router.get(
  "/:id",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  getSifarisTypeById
);
router.put(
  "/:id",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  updateSifarisType
);
router.delete(
  "/:id",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  deleteSifarisType
);

export default router;
