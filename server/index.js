import express from 'express';
import authRoutes from './routers/authRoutes.js';
import coursesRoutes from './routers/coursesRoutes.js'; 
import { checkConnection } from './config/db.js';
import createAllTables from './utils/dbutils.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);



app.listen(5000, async () => {
  console.log('Server is running on port 5000');
  try {
    await checkConnection();
    await createAllTables();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
});
