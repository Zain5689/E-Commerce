import { Banner, Testimonial } from '../../models/Home';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';
import { Brand } from '../../models/Brand';

export class HomeService {
  static async getHomeData() {
    const [heroSlides, sideBanners, categories, flashDeals, featuredProducts, brands, testimonials] = await Promise.all([
      Banner.find({ type: 'hero' }).sort({ displayOrder: 1 }).lean(),
      Banner.find({ type: 'side' }).sort({ displayOrder: 1 }).lean(),
      Category.find().sort({ displayOrder: 1 }).lean(),
      Product.find({ isPublished: true, $or: [{ badge: { $exists: true, $ne: '' } }, { $expr: { $gt: ['$originalPrice', '$price'] } }] })
        .sort({ soldCount: -1, createdAt: -1 })
        .limit(6)
        .lean(),
      Product.find({ isPublished: true }).sort({ rating: -1, reviewsCount: -1 }).limit(8).lean(),
      Brand.find().limit(10).lean(),
      Testimonial.find().sort({ createdAt: -1 }).limit(6).lean(),
    ]);

    return {
      heroSlides,
      sideBanners,
      categories,
      flashDeals,
      featuredProducts,
      brands,
      testimonials,
    };
  }
}
