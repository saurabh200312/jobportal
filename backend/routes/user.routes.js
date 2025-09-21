import express from 'express';
import {
  register,
  login,
  logout,
  getUserProfile
} from '../controllers/user.controller.js';

import isAuthenticated from '../middleware/isAuthenticated.js'; // correct middleware

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/profile', isAuthenticated, getUserProfile); // use correct middleware

export default router;
