import { Router, Request, Response, NextFunction } from 'express';
import { Coupon } from '../../models/Coupon';

const HARDCODED_COUPONS: Record<string, { discountPercent: number }> = {
  NEXUS10: { discountPercent: 10 },
  EGYPT10: { discountPercent: 10 },
  VIP15: { discountPercent: 15 },
};

const router = Router();

router.post('/validate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, subtotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, error: 'Promo code is required' });
    }

    const upperCode = (code as string).trim().toUpperCase();

    // Check hardcoded coupons first
    if (HARDCODED_COUPONS[upperCode]) {
      const { discountPercent } = HARDCODED_COUPONS[upperCode];
      return res.json({
        success: true,
        data: {
          code: upperCode,
          discountPercent,
          discountAmount: subtotal ? Math.round((Number(subtotal) * discountPercent) / 100) : null,
        },
      });
    }

    // Check DB coupons
    const coupon = await Coupon.findOne({ code: upperCode, isActive: true });
    if (!coupon) {
      return res.status(404).json({ success: false, error: 'Invalid or expired promo code' });
    }

    if (coupon.validUntil && coupon.validUntil < new Date()) {
      return res.status(400).json({ success: false, error: 'This promo code has expired' });
    }

    if (subtotal && coupon.minSubtotal && Number(subtotal) < coupon.minSubtotal) {
      return res.status(400).json({
        success: false,
        error: `Minimum order of ${coupon.minSubtotal} EGP required for this coupon`,
      });
    }

    const discountPercent = coupon.discountPercent;
    let discountAmount = subtotal ? Math.round((Number(subtotal) * discountPercent) / 100) : null;
    if (discountAmount && coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
      discountAmount = coupon.maxDiscount;
    }

    return res.json({
      success: true,
      data: { code: upperCode, discountPercent, discountAmount },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
