import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
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
  createCategory
);
router.get(
  "/",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  getCategories
);
router.get(
  "/:id",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN, Role.USER],
  }),
  getCategoryById
);
router.put(
  "/:id",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN],
  }),
  updateCategory
);
router.delete(
  "/:id",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.ADMIN],
  }),
  deleteCategory
);

export default router;
