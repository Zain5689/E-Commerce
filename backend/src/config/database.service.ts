import mongoose from 'mongoose';
import { env } from './env.config';

export const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoUri = env.MONGO_URI || 'mongodb://127.0.0.1:27017/nexus_store';
    await mongoose.connect(mongoUri);
    console.log('🍃 MongoDB Connected successfully via Mongoose');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};
