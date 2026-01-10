import express from 'express';
import auth from '../middleware/auth.js';
import { createCourse, getCourses, updateCourseAnalysis, updateCoursePlan } from '../controllers/Course.js';

const router = express.Router();

router.post('/courses', auth, createCourse);
router.get('/courses', auth, getCourses);

// n8n webhook callback for analysis
router.post('/course/:id/analysis', updateCourseAnalysis);

// n8n webhook callback for course plan
router.post('/course/:id/plan', updateCoursePlan);

export default router;
