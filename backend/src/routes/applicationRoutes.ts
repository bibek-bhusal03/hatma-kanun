import { Router } from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/applicationController";
import { upload } from "../middlewares/multer";

const router = Router();
router.post("/", upload.array("files", 5), createApplication);
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.put("/:id/status", updateApplicationStatus);
router.delete("/:id", deleteApplication);

export default router;
