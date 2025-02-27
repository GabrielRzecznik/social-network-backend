import { Router } from "express";
import { sendMessage, updateMessage } from "../controllers/message.controller.js";

const router = Router();

router.post("/send", sendMessage);
router.put("/update", updateMessage);

export default router;