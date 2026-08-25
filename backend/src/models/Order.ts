import { Schema, model, Document, Types } from 'mongoose';

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku?: string;
  variantId?: string;
  variantName?: string;
}

export interface IOrderAddress {
  name: string;
  phone: string;
  city: string;
  cityAr?: string;
  address: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  user?: Types.ObjectId;
  guestEmail?: string;
  guestPhone?: string;
  items: IOrderItem[];
  shippingAddress: IOrderAddress;
  governorate: string;
  shippingFee: number;
  promoCode?: string;
  discountAmount: number;
  subtotal: number;
  total: number;
  paymentMethod: 'COD' | 'CREDIT_CARD' | 'FAWRY' | 'VODAFONE_CASH';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingStep: number; // 1: Order Placed/Processing, 2: Packed, 3: Out for Delivery, 4: Delivered
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    guestEmail: { type: String },
    guestPhone: { type: String },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String, required: true },
        sku: { type: String },
        variantId: { type: String },
        variantName: { type: String },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      cityAr: { type: String },
      address: { type: String, required: true },
    },
    governorate: { type: String, required: true, default: 'cairo' },
    shippingFee: { type: Number, required: true, default: 0 },
    promoCode: { type: String },
    discountAmount: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['COD', 'CREDIT_CARD', 'FAWRY', 'VODAFONE_CASH'],
      default: 'COD',
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED'],
      default: 'PENDING',
    },
    orderStatus: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing',
    },
    trackingStep: { type: Number, default: 1, min: 1, max: 4 },
    notes: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Order = model<IOrder>('Order', orderSchema);
