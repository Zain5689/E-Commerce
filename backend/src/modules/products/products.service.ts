import { Product, IProduct, IProductReview } from '../../models/Product';
import { AppError } from '../../common/middleware/errorHandler';

export interface ProductQueryFilter {
  categorySlug?: string;
  category?: string;
  brandSlugs?: string[];
  brand?: string;
  condition?: string[];
  minPrice?: number;
  maxPrice?: number;
  specs?: Record<string, string[]>;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'rating_desc';
  page?: number;
  limit?: number;
}

export class ProductsService {
  static async getFilteredProducts(filter: ProductQueryFilter) {
    const page = Math.max(Number(filter.page) || 1, 1);
    const limit = Math.max(Number(filter.limit) || 24, 1);
    const skip = (page - 1) * limit;

    const query: Record<string, any> = { isPublished: true };

    const categoryTarget = filter.categorySlug || filter.category;
    if (categoryTarget && categoryTarget !== 'all') {
      query.category = { $regex: new RegExp(`^${categoryTarget}$`, 'i') };
    }

    const brandFilter = filter.brandSlugs || (filter.brand ? [filter.brand] : undefined);
    if (brandFilter && brandFilter.length > 0) {
      query.brand = { $in: brandFilter.map((b) => new RegExp(b, 'i')) };
    }

    if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
      query.price = {};
      if (filter.minPrice !== undefined) query.price.$gte = Number(filter.minPrice);
      if (filter.maxPrice !== undefined) query.price.$lte = Number(filter.maxPrice);
    }

    if (filter.search && filter.search.trim()) {
      const searchRegex = new RegExp(filter.search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { nameAr: searchRegex },
        { sku: searchRegex },
        { specs: searchRegex },
        { specsAr: searchRegex },
        { description: searchRegex },
        { descriptionAr: searchRegex },
      ];
    }

    let sort: Record<string, 1 | -1> = { createdAt: -1 };
    if (filter.sortBy === 'price_asc') sort = { price: 1 };
    if (filter.sortBy === 'price_desc') sort = { price: -1 };
    if (filter.sortBy === 'rating_desc') sort = { rating: -1, reviewsCount: -1 };
    if (filter.sortBy === 'newest') sort = { createdAt: -1 };

    const [items, total] = await Promise.all([
      Product.find(query).sort(sort).skip(skip).limit(limit).lean(),
      Product.countDocuments(query),
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

  static async getFlashDeals(limit: number = 6) {
    return Product.find({
      isPublished: true,
      $or: [
        { badge: { $exists: true, $ne: '' } },
        { $expr: { $gt: ['$originalPrice', '$price'] } },
      ],
    })
      .sort({ soldCount: -1, createdAt: -1 })
      .limit(limit)
      .lean();
  }

  static async getFeaturedProducts(limit: number = 8) {
    return Product.find({ isPublished: true })
      .sort({ rating: -1, reviewsCount: -1, createdAt: -1 })
      .limit(limit)
      .lean();
  }

  static async getProductByIdOrSlug(idOrSlug: string) {
    let product = await Product.findOne({
      $or: [{ id: idOrSlug }, { slug: idOrSlug }],
    }).lean();

    if (!product && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(idOrSlug).lean();
    }

    return product;
  }

  static async getAutocompleteSuggestions(query: string) {
    if (!query || query.trim().length < 2) return [];

    const searchRegex = new RegExp(query.trim(), 'i');
    return Product.find({
      isPublished: true,
      $or: [
        { name: searchRegex },
        { nameAr: searchRegex },
        { sku: searchRegex },
        { specs: searchRegex },
      ],
    })
      .select('id name nameAr slug price originalPrice image category rating')
      .limit(8)
      .lean();
  }

  static async addReview(
    productId: string,
    reviewData: {
      author: string;
      authorAr?: string;
      rating: number;
      comment: string;
      commentAr?: string;
      userCity?: string;
      userCityAr?: string;
    }
  ) {
    const product = await Product.findOne({
      $or: [{ id: productId }, { slug: productId }],
    });

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    const newReview: IProductReview = {
      id: `rev-${Date.now()}`,
      author: reviewData.author,
      authorAr: reviewData.authorAr,
      rating: Math.min(Math.max(reviewData.rating, 1), 5),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      dateAr: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
      comment: reviewData.comment,
      commentAr: reviewData.commentAr,
      verified: true,
      userCity: reviewData.userCity,
      userCityAr: reviewData.userCityAr,
    };

    product.reviews.push(newReview);
    product.reviewsCount = product.reviews.length;
    const sumRatings = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    product.rating = Number((sumRatings / product.reviews.length).toFixed(1));

    await product.save();
    return product;
  }
}
