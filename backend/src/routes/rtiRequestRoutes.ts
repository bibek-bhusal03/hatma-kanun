import express from "express";
import {
  createRTIRequest,
  getAllRTIRequests,
  getUserRTIRequests,
  getRTIRequestById,
  updateRTIRequest,
  deleteRTIRequest,
} from "../controllers/rtiRequestController";
import { upload } from "../middlewares/multer";
import { validateAccessToken } from "@baijanstack/express-auth";
import { checkPermissionsMiddleware } from "../middlewares/auth";
import { Role } from "../models/User";

const router = express.Router();

router.post(
  "/",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  upload.array("attachments"),
  createRTIRequest
);
router.get(
  "/",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  getAllRTIRequests
);
router.get(
  "/user/:userId",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  getUserRTIRequests
);
router.get(
  "/:id",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),

  getRTIRequestById
);
router.put(
  "/:id",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  updateRTIRequest
);
router.delete(
  "/:id",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  deleteRTIRequest
);

export default router;
