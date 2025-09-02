import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';

export const registerUser = async (user) => {
  const { first_name, last_name, username, email, password } = user;
  if (!first_name || !last_name || !username || !email || !password) {
    return { success: false, message: 'Please fill all fields' };
  }

  try {
    // تحقق إذا كان المستخدم موجود مسبقاً
    const [existingUser] = await pool.query('SELECT * FROM app_users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return { success: false, message: 'Email already registered' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO app_users(first_name, last_name, username, email, password) VALUES(?,?,?,?,?)';
    const values = [first_name, last_name, username, email, hashedPassword];

    await pool.query(query, values);
    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    return { success: false, message: 'Error registering user' };
  }
};
