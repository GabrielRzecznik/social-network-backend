import { Router } from "express";
import { getUserChats, getChat, updateChat } from "../controllers/chat.controller.js";
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.get("/chat-list", protectRoute, getUserChats);
router.post("/:id_chat", getChat);
router.patch("/update", updateChat);

export default router;