import { Router } from "express";
import { getReview } from "../controller/ai.controller.js";

const router = Router();

// Update to POST route for handling JSON body
router.post("/get-review", getReview);

export default router;
