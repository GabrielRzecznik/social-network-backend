import { Router } from "express";
import { createNewPublication, updatePublication, updateStatusPublication } from "../controllers/publication.controller.js";

const router = Router();

router.post("/create", createNewPublication);
router.put("/:id_publication", updatePublication);
router.patch("/status", updateStatusPublication);

export default router;