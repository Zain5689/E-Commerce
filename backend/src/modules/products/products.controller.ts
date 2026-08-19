import { Request, Response, NextFunction } from 'express';
import { ProductsService } from './products.service';
import { AppError } from '../../common/middleware/errorHandler';

export class ProductsController {
  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { categorySlug, brandSlugs, condition, minPrice, maxPrice, search, sortBy, page, limit, specs } = req.query;

      let parsedSpecs: Record<string, string[]> | undefined;
      if (specs && typeof specs === 'string') {
        try {
          parsedSpecs = JSON.parse(specs);
        } catch (e) {
          parsedSpecs = undefined;
        }
      }

      const result = await ProductsService.getFilteredProducts({
        categorySlug: categorySlug as string,
        brandSlugs: brandSlugs ? (Array.isArray(brandSlugs) ? brandSlugs as string[] : [brandSlugs as string]) : undefined,
        condition: condition ? (Array.isArray(condition) ? condition as any : [condition as any]) : undefined,
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

  static async getProductBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const product = await ProductsService.getProductBySlug(slug);

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
}
