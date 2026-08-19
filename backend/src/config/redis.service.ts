import { createClient } from 'redis';
import { env } from './env.config';

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export async function connectRedis() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('✅ Redis connected successfully');
    }
  } catch (error) {
    console.warn('⚠️ Could not connect to Redis (running without caching fallback):', error);
  }
}
