import { createClient } from 'redis';
import { env } from './env.config';

export const redisClient = createClient({
  url: env.REDIS_URL,
  socket: {
    reconnectStrategy: false,
  },
});

redisClient.on('error', (err) => {
  // Silent or single warning
});

export async function connectRedis() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('✅ Redis connected successfully');
    }
  } catch (error) {
    console.warn('⚠️ Redis not available. Running backend without caching layer.');
  }
}

