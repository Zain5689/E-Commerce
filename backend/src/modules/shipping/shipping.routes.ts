import { Router, Request, Response, NextFunction } from 'express';

const GOVERNORATE_RATES = [
  { key: 'cairo', nameEn: 'Cairo', nameAr: 'القاهرة', fee: 50 },
  { key: 'giza', nameEn: 'Giza', nameAr: 'الجيزة', fee: 50 },
  { key: 'alex', nameEn: 'Alexandria', nameAr: 'الإسكندرية', fee: 65 },
  { key: 'delta', nameEn: 'Delta Region', nameAr: 'محافظات الدلتا', fee: 75 },
  { key: 'upper', nameEn: 'Upper Egypt', nameAr: 'صعيد مصر', fee: 95 },
];

const FREE_SHIPPING_THRESHOLD = 10000;

const router = Router();

router.get('/governorates', (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: {
      governorates: GOVERNORATE_RATES,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    },
  });
});

export default router;
