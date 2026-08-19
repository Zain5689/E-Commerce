import { prisma } from '../../config/prisma.service';
import { redisClient } from '../../config/redis.service';

export class CategoriesService {
  static async getCategoryTree() {
    const cacheKey = 'categories:tree';

    if (redisClient.isOpen) {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }
    }

    const categories = await prisma.category.findMany({
      where: { parentId: null },
      orderBy: { displayOrder: 'asc' },
      include: {
        children: {
          orderBy: { displayOrder: 'asc' },
          include: {
            children: {
              orderBy: { displayOrder: 'asc' },
            },
            specKeys: true,
          },
        },
        specKeys: true,
      },
    });

    if (redisClient.isOpen) {
      await redisClient.setEx(cacheKey, 86400, JSON.stringify(categories));
    }

    return categories;
  }
}
