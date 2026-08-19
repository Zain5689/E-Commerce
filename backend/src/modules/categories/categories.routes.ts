import { Router, Request, Response, NextFunction } from 'express';
import { CategoriesService } from './categories.service';

const router = Router();

router.get('/tree', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tree = await CategoriesService.getCategoryTree();
    return res.json({ success: true, data: tree });
  } catch (error) {
    next(error);
  }
});

export default router;
