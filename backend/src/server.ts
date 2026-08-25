import app from './app';
import { env } from './config/env.config';
import { connectMongoDB } from './config/database.service';
import { connectRedis } from './config/redis.service';
import { seedDatabase } from './config/seed.service';

async function bootstrap() {
  await connectMongoDB();
  await connectRedis();
  await seedDatabase();

  app.listen(env.PORT, () => {
    console.log(`🚀 Nexus Store Express API running on http://localhost:${env.PORT}`);
  });
}

bootstrap();
