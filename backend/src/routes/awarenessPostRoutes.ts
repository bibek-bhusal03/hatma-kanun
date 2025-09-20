import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/awarenessPostController";
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
  createPost
);
router.get(
  "/",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.USER, Role.ADMIN],
  }),
  getPosts
);
router.get(
  "/:id",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.USER, Role.ADMIN],
  }),
  getPostById
);
router.put(
  "/:id",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.USER, Role.ADMIN],
  }),
  updatePost
);
router.delete(
  "/:id",
  validateAccessToken,
  checkPermissionsMiddleware({
    apiPermissions: [Role.USER, Role.ADMIN],
  }),
  deletePost
);

export default router;
