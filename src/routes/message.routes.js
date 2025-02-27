import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.post("/send", sendMessage);

export default router;