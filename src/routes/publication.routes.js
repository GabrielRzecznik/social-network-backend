import { Router } from "express";
import { createNewPublication } from "../controllers/publication.controller.js";

const router = Router();

router.post("/create", createNewPublication);

export default router;