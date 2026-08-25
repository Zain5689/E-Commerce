import { Request, Response, NextFunction } from 'express';
import { AddressesService } from './addresses.service';
import { AppError } from '../../common/middleware/errorHandler';

export class AddressesController {
  static async getAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AppError(401, 'Unauthorized');
      const addresses = await AddressesService.getAddresses(req.user.id);
      return res.json({ success: true, data: addresses });
    } catch (error) {
      next(error);
    }
  }

  static async createAddress(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AppError(401, 'Unauthorized');
      const { title, name, phone, city, cityAr, address, isDefault } = req.body;
      if (!title || !name || !phone || !city || !address) {
        throw new AppError(400, 'Title, name, phone, city, and address are required');
      }
      const addr = await AddressesService.createAddress({
        userId: req.user.id,
        title, name, phone, city, cityAr, address,
        isDefault: isDefault === true,
      });
      return res.status(201).json({ success: true, data: addr });
    } catch (error) {
      next(error);
    }
  }

  static async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AppError(401, 'Unauthorized');
      const { id } = req.params;
      const updated = await AddressesService.updateAddress(id, req.user.id, req.body);
      return res.json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AppError(401, 'Unauthorized');
      const { id } = req.params;
      const result = await AddressesService.deleteAddress(id, req.user.id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async setDefault(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AppError(401, 'Unauthorized');
      const { id } = req.params;
      const addr = await AddressesService.setDefaultAddress(id, req.user.id);
      return res.json({ success: true, data: addr });
    } catch (error) {
      next(error);
    }
  }
}
