import express from "express";
import multer from "multer";
import path from "path";
import {
  createRTIRequest,
  getAllRTIRequests,
  getUserRTIRequests,
  getRTIRequestById,
  updateRTIRequest,
  deleteRTIRequest,
} from "../controllers/rtiRequestController";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.post("/", upload.array("attachments"), createRTIRequest);
router.get("/", getAllRTIRequests);
router.get("/user/:userId", getUserRTIRequests);
router.get("/:id", getRTIRequestById);
router.put("/:id", updateRTIRequest);
router.delete("/:id", deleteRTIRequest);

export default router;
