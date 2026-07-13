import express from 'express';
import { getDestinations, getDestinationBySlug, createDestination, updateDestination } from '../controllers/destinationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getDestinations)
  .post(protect, admin, createDestination);

router.route('/:slug')
  .get(getDestinationBySlug)
  .put(protect, admin, updateDestination);

export default router;
