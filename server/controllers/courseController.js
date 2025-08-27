import { pool } from '../config/db.js';

export const getAllCourses = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courses');
    res.json({ success: true, courses: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// البحث بالدورة باستخدام الـ slug بدل id
export const getCourseBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM courses WHERE slug = ?', [slug]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, course: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
