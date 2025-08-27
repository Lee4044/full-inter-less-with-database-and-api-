import express from 'express';
import { getAllCourses, getCourseBySlug } from '../controllers/courseController.js';

const router = express.Router();

// Get all courses
router.get('/', getAllCourses);

// Get course by slug
router.get('/:slug', getCourseBySlug);

export default router;
