import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

import leadRoutes from './routes/leadRoutes';
import authRoutes from './routes/authRoutes';
import customerRoutes from './routes/customerRoutes';

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/customers', customerRoutes);

// Basic Route for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running beautifully!' });
});

// Import Routes (to be created)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
