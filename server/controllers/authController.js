import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// دالة التسجيل
export const register = async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;
  if (!first_name || !last_name || !username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }

  try {
    const [existingUser] = await pool.query('SELECT * FROM app_users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO app_users (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, username, email, hashedPassword]
    );

    const userId = result.insertId;
    const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({ 
      success: true, 
      message: 'User registered successfully',
      user: { id: userId, first_name, last_name, username, email },
      token
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
  }
};

// دالة تسجيل الدخول
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM app_users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({ 
      success: true, 
      message: 'Login successful', 
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email
      },
      token
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
  }
};
