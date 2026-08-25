import { Request, Response, NextFunction } from 'express';
import { OrdersService } from './orders.service';
import { AppError } from '../../common/middleware/errorHandler';

export class OrdersController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const { items, shippingAddress, governorate, promoCode, paymentMethod, guestEmail, guestPhone, notes } = req.body;

      const order = await OrdersService.createOrder({
        userId,
        guestEmail,
        guestPhone,
        items,
        shippingAddress,
        governorate,
        promoCode,
        paymentMethod,
        notes,
      });

      return res.status(201).json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  }

  static async getMyOrders(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError(401, 'Unauthorized');
      }

      const orders = await OrdersService.getUserOrders(req.user.id);
      return res.json({ success: true, data: orders });
    } catch (error) {
      next(error);
    }
  }

  static async getMyStats(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError(401, 'Unauthorized');
      }

      const stats = await OrdersService.getUserStats(req.user.id);
      return res.json({ success: true, data: stats });
    } catch (error) {
      next(error);
    }
  }

  static async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const order = await OrdersService.getOrderById(id, req.user?.id);
      return res.json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  }
}
