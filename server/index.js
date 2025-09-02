import express from 'express';
import authRoutes from './routers/authRoutes.js';
import coursesRoutes from './routers/coursesRoutes.js'; 
import { checkConnection } from './config/db.js';
import createAllTables from './utils/dbutils.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || true 
    : 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, '../dist')));

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🚀 Server is running on port ${PORT}`);
  }
  
  try {
    await checkConnection();
    await createAllTables();
    if (process.env.NODE_ENV !== 'production') {
      console.log('📚 Database tables initialized');
    }
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    // Don't exit in production, log and continue
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
});
