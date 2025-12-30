import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import { productRoutes } from './routes/product.routes';
import { orderRoutes } from './routes/order.routes';
import { adminRoutes } from './routes/admin.routes';
import { adminAuthMiddleware } from './middleware/auth';

const app = express();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Public Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Admin Routes (protected)
app.use('/api/admin', adminAuthMiddleware, adminRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

export default app; 