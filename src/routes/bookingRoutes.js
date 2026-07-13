import express from 'express';
import { createBooking, verifyPayment, getAllBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order', protect, createBooking);
router.post('/verify-payment', verifyPayment);
router.get('/bookings', getAllBookings);

export default router;
