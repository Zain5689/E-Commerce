import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.config';
import { errorHandler } from './common/middleware/errorHandler';
import productsRoutes from './modules/products/products.routes';
import categoriesRoutes from './modules/categories/categories.routes';

const app = express();

app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', environment: env.NODE_ENV, timestamp: new Date() });
});

// API V1 Routes
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/categories', categoriesRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
