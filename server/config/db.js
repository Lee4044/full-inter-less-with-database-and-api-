import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql2.createPool({
  host: process.env.DB_HOST || '192.168.100.93',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'HA123456$',
  database: process.env.DB_NAME || 'education',
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true,
});

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:');
        throw error;

    }
}
export { pool, checkConnection };
