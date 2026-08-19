import { Prisma, Condition } from '@prisma/client';
import { prisma } from '../../config/prisma.service';

export interface ProductQueryFilter {
  categorySlug?: string;
  brandSlugs?: string[];
  condition?: Condition[];
  minPrice?: number;
  maxPrice?: number;
  specs?: Record<string, string[]>;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  limit?: number;
}

export class ProductsService {
  static async getFilteredProducts(filter: ProductQueryFilter) {
    const page = Number(filter.page) || 1;
    const limit = Number(filter.limit) || 24;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      isPublished: true,
    };

    if (filter.categorySlug) {
      where.category = {
        OR: [
          { slug: filter.categorySlug },
          { parent: { slug: filter.categorySlug } },
          { parent: { parent: { slug: filter.categorySlug } } },
        ],
      };
    }

    if (filter.brandSlugs && filter.brandSlugs.length > 0) {
      where.brand = { slug: { in: filter.brandSlugs } };
    }

    if (filter.condition && filter.condition.length > 0) {
      where.condition = { in: filter.condition };
    }

    if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
      where.basePrice = {
        gte: filter.minPrice !== undefined ? Number(filter.minPrice) : 0,
        lte: filter.maxPrice !== undefined ? Number(filter.maxPrice) : 999999,
      };
    }

    if (filter.specs && Object.keys(filter.specs).length > 0) {
      const specConditions: Prisma.ProductSpecificationWhereInput[] = [];

      for (const [keyName, values] of Object.entries(filter.specs)) {
        if (Array.isArray(values) && values.length > 0) {
          specConditions.push({
            specificationKey: { nameEn: keyName },
            valueEn: { in: values },
          });
        }
      }

      if (specConditions.length > 0) {
        where.AND = specConditions.map((cond) => ({
          specifications: { some: cond },
        }));
      }
    }

    if (filter.search) {
      where.OR = [
        { nameEn: { contains: filter.search, mode: 'insensitive' } },
        { nameAr: { contains: filter.search, mode: 'insensitive' } },
        { sku: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (filter.sortBy === 'price_asc') orderBy = { basePrice: 'asc' };
    if (filter.sortBy === 'price_desc') orderBy = { basePrice: 'desc' };

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          images: { where: { isPrimary: true } },
          brand: true,
          category: true,
          variants: true,
          specifications: {
            include: { specificationKey: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getProductBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { order: 'asc' } },
        brand: true,
        category: true,
        variants: true,
        specifications: {
          include: { specificationKey: true },
        },
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true } } },
        },
      },
    });
  }

  static async getAutocompleteSuggestions(query: string) {
    if (!query || query.length < 2) return [];

    return prisma.product.findMany({
      where: {
        isPublished: true,
        OR: [
          { nameEn: { contains: query, mode: 'insensitive' } },
          { nameAr: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 8,
      select: {
        id: true,
        nameEn: true,
        nameAr: true,
        slug: true,
        basePrice: true,
        images: { where: { isPrimary: true }, take: 1, select: { url: true } },
      },
    });
  }
}
