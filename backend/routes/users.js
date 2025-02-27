const express = require('express');
const router = express.Router();
const { 
  loginUser, 
  registerUser, 
  getUserProfile, 
  updateUserProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Routes publiques
router.post('/login', loginUser);
router.post('/register', registerUser);

// Routes protégées
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
