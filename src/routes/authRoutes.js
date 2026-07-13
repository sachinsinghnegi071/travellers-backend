import express from 'express';
import { register, login, adminBypass } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin-bypass', adminBypass);

export default router;
