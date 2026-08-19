import app from './app';
import { env } from './config/env.config';
import { connectPrisma } from './config/prisma.service';
import { connectRedis } from './config/redis.service';

async function bootstrap() {
  await connectPrisma();
  await connectRedis();

  app.listen(env.PORT, () => {
    console.log(`🚀 Kimo Store Backend API running on http://localhost:${env.PORT}`);
  });
}

bootstrap();
