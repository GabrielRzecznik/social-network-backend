import { Router } from "express";
import { getUserChats, getChat } from "../controllers/chat.controller.js";

const router = Router();

router.get("/chat-list", getUserChats);
router.post("/:id_chat", getChat);
//router.patch("/update", updateChat);

export default router;