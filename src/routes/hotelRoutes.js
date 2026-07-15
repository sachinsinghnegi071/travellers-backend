import express from 'express';
import { createOrUpdateHotel, getManagerHotel, getHotelsByLocation } from '../controllers/hotelController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to search hotels
router.get('/', getHotelsByLocation);

// Protected routes for Hotel Managers
router.get('/my-hotel', protect, getManagerHotel);
router.post('/', protect, createOrUpdateHotel);

export default router;
