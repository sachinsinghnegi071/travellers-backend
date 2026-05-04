import { Router } from "express";
import {
  createTripRequest,
  getTripRequests,
} from "../controllers/tripRequestController.js";

const router = Router();

router.get("/", getTripRequests);
router.post("/", createTripRequest);

export default router;
