import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Generate JWT token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretportfoliojwtkey_2026_ashish_xess', {
    expiresIn: '30d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`[AUTH] Login attempt received. Username: "${username}", Password length: ${password ? password.length : 0}`);

  try {
    const admin = await Admin.findOne({ 
      username: { $regex: new RegExp(`^${username}$`, 'i') } 
    });

    if (!admin) {
      console.log(`[AUTH] User "${username}" not found in database.`);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log(`[AUTH] User "${username}" found. Hashed password in DB: "${admin.password}".`);
    const isMatch = await admin.matchPassword(password);
    console.log(`[AUTH] Password comparison result: ${isMatch}`);

    if (isMatch) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('[AUTH] Login route error:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.json(req.admin);
});

export default router;
