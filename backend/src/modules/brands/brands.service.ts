import { Brand } from '../../models/Brand';

export class BrandsService {
  static async getAllBrands() {
    return Brand.find().sort({ name: 1 }).lean();
  }
}
