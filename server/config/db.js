import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Check for required environment variables
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn(`Missing environment variables: ${missingVars.join(', ')}`);
  console.warn('Using fallback values for development');
}

const pool = mysql2.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'education',
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
  waitForConnections: true,
});

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connection successful');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.error('Please check your database configuration in .env file');
        return false;
    }
}

export { pool, checkConnection };
