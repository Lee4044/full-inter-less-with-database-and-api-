import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();


const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,       // <-- no spaces around .env
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
