import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.config';
import { errorHandler } from './common/middleware/errorHandler';
import productsRoutes from './modules/products/products.routes';
import categoriesRoutes from './modules/categories/categories.routes';
import brandsRoutes from './modules/brands/brands.routes';
import authRoutes from './modules/auth/auth.routes';
import ordersRoutes from './modules/orders/orders.routes';
import addressesRoutes from './modules/addresses/addresses.routes';
import shippingRoutes from './modules/shipping/shipping.routes';
import couponsRoutes from './modules/coupons/coupons.routes';
import homeRoutes from './modules/home/home.routes';

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
app.use('/api/v1/brands', brandsRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/addresses', addressesRoutes);
app.use('/api/v1/shipping', shippingRoutes);
app.use('/api/v1/coupons', couponsRoutes);
app.use('/api/v1/home', homeRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
