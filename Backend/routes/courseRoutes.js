import express from 'express';
import auth from '../middleware/auth.js';
import { createCourse, getCourses } from '../controllers/Course.js';

const router = express.Router();

router.post('/courses', auth, createCourse);
router.get('/courses', auth, getCourses);

export default router;
