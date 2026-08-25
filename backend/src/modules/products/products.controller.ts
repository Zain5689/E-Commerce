import { Request, Response, NextFunction } from 'express';
import { ProductsService } from './products.service';
import { AppError } from '../../common/middleware/errorHandler';

export class ProductsController {
  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { categorySlug, category, brandSlugs, brand, minPrice, maxPrice, search, sortBy, page, limit, specs } = req.query;

      let parsedSpecs: Record<string, string[]> | undefined;
      if (specs && typeof specs === 'string') {
        try {
          parsedSpecs = JSON.parse(specs);
        } catch (e) {
          parsedSpecs = undefined;
        }
      }

      const result = await ProductsService.getFilteredProducts({
        categorySlug: (categorySlug as string) || (category as string),
        brandSlugs: brandSlugs ? (Array.isArray(brandSlugs) ? (brandSlugs as string[]) : [brandSlugs as string]) : undefined,
        brand: brand as string,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        specs: parsedSpecs,
        search: search as string,
        sortBy: sortBy as any,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 24,
      });

      return res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async getFlashDeals(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 6;
      const deals = await ProductsService.getFlashDeals(limit);
      return res.json({ success: true, data: deals });
    } catch (error) {
      next(error);
    }
  }

  static async getFeatured(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 8;
      const featured = await ProductsService.getFeaturedProducts(limit);
      return res.json({ success: true, data: featured });
    } catch (error) {
      next(error);
    }
  }

  static async getProductByIdOrSlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug, id } = req.params;
      const target = slug || id;
      const product = await ProductsService.getProductByIdOrSlug(target);

      if (!product) {
        throw new AppError(404, 'Product not found');
      }

      return res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  }

  static async getAutocomplete(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;
      const suggestions = await ProductsService.getAutocompleteSuggestions(q as string);
      return res.json({ success: true, data: suggestions });
    } catch (error) {
      next(error);
    }
  }

  static async addReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { author, authorAr, rating, comment, commentAr, userCity, userCityAr } = req.body;

      if (!author || !rating || !comment) {
        throw new AppError(400, 'Author, rating and comment are required');
      }

      const updatedProduct = await ProductsService.addReview(id, {
        author,
        authorAr,
        rating: Number(rating),
        comment,
        commentAr,
        userCity,
        userCityAr,
      });

      return res.status(201).json({ success: true, data: updatedProduct });
    } catch (error) {
      next(error);
    }
  }
}
