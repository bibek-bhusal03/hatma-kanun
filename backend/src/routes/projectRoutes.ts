import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { validateAccessToken } from "@baijanstack/express-auth";
import { checkPermissionsMiddleware } from "../middlewares/auth";
import { Role } from "../models/User";

const router = Router();

router.post(
  "/",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN],
  }),
  createProject
);
router.get(
  "/",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.USER, Role.ADMIN],
  }),
  getProjects
);
router.get(
  "/:id",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.USER, Role.ADMIN],
  }),
  getProjectById
);
router.put(
  "/:id",

  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN],
  }),
  updateProject
);
router.delete(
  "/:id",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN],
  }),
  deleteProject
);

export default router;
