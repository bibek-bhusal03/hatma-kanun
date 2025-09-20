import { Router } from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/applicationController";
import { upload } from "../middlewares/multer";
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
  upload.array("files", 5),
  createApplication
);
router.get(
  "/",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  getApplications
);
router.get(
  "/:id",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  getApplicationById
);
router.put(
  "/:id/status",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  updateApplicationStatus
);
router.delete(
  "/:id",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  deleteApplication
);

export default router;
