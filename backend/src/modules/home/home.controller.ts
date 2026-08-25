import { Request, Response, NextFunction } from 'express';
import { HomeService } from './home.service';

export class HomeController {
  static async getHomeData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await HomeService.getHomeData();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}
