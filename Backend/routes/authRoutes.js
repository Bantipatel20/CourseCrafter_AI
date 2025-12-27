import express from 'express';
import auth from '../middleware/auth.js';
import { register, login } from '../controllers/User.js';

const router = express.Router();


router.post('/register', register);
router.post('/login', login);


router.get('/me', auth, (req, res) => {
  res.json({ msg: 'Protected route accessed', userId: req.userId });
});

export default router;