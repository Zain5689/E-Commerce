import { Category } from '../../models/Category';

export class CategoriesService {
  static async getAllCategories() {
    return Category.find().sort({ displayOrder: 1, createdAt: 1 }).lean();
  }

  static async getCategoryTree() {
    const categories = await Category.find().sort({ displayOrder: 1 }).lean();
    return categories;
  }
}
