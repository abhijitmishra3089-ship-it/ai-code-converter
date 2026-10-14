import { Router } from "express";
import { createConversion, listConversions, removeConversion } from "../controllers/converterController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
router.use(protect);
router.get("/", listConversions);
router.post("/", createConversion);
router.delete("/:id", removeConversion);
export default router;