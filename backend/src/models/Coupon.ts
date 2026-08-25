import { Schema, model, Document } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  minSubtotal?: number;
  isActive: boolean;
  validUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountPercent: { type: Number, required: true, min: 1, max: 100 },
    maxDiscount: { type: Number },
    minSubtotal: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    validUntil: { type: Date },
  },
  { timestamps: true }
);

export const Coupon = model<ICoupon>('Coupon', couponSchema);
