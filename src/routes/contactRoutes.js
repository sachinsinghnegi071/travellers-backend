import express from 'express';
import { createContactMessage, getContactMessages } from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to submit support/contact message (public or by signed-in users)
router.post('/', createContactMessage);

// Route to get all messages (restricted to Admins only)
router.get('/', protect, admin, getContactMessages);

export default router;
