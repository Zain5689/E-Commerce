import { Router, Request, Response, NextFunction } from 'express';
import { BrandsService } from './brands.service';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brands = await BrandsService.getAllBrands();
    return res.json({ success: true, data: brands });
  } catch (error) {
    next(error);
  }
});

export default router;
