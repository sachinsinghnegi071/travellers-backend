import express from 'express';
import { createReview, getAllReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/', getAllReviews);

export default router;
