import { Router } from "express";
import {
  createSifarisType,
  getSifarisTypes,
  getSifarisTypeById,
  updateSifarisType,
  deleteSifarisType,
} from "../controllers/sifarisController";

const router = Router();

router.post("/", createSifarisType);
router.get("/", getSifarisTypes);
router.get("/:id", getSifarisTypeById);
router.put("/:id", updateSifarisType);
router.delete("/:id", deleteSifarisType);

export default router;
