import { Types } from 'mongoose';
import { Order, IOrder, IOrderItem, IOrderAddress } from '../../models/Order';
import { Coupon } from '../../models/Coupon';
import { Governorate } from '../../models/Governorate';
import { AppError } from '../../common/middleware/errorHandler';
import { Product } from '../../models/Product';



export interface CreateOrderDto {
  userId?: string;
  guestEmail?: string;
  guestPhone?: string;
  items: IOrderItem[];
  shippingAddress: IOrderAddress;
  governorate?: string;
  promoCode?: string;
  paymentMethod?: 'COD' | 'CREDIT_CARD' | 'FAWRY' | 'VODAFONE_CASH';
  notes?: string;
}

export class OrdersService {
  static async createOrder(data: CreateOrderDto) {
    if (!data.items || data.items.length === 0) {
      throw new AppError(400, 'Order must contain at least one item');
    }

    if (!data.shippingAddress || !data.shippingAddress.name || !data.shippingAddress.phone || !data.shippingAddress.address) {
      throw new AppError(400, 'Complete shipping address is required');
    }

    // Hydrate items with name/image if missing
    for (const item of data.items) {
      if (!item.name || !item.image) {
        const query: any[] = [{ id: item.productId }];
        if (Types.ObjectId.isValid(item.productId)) {
          query.push({ _id: item.productId });
        }
        const prod = await Product.findOne({ $or: query });
        if (prod) {
          item.name = item.name || prod.name;
          item.image = item.image || prod.image;
        } else {
          item.name = item.name || 'Hardware Product';
          item.image = item.image || 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=300&q=80';
        }
      }
    }

    // Calculate subtotal
    const subtotal = data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);


    // Calculate shipping fee
    let shippingFee = 50;
    const govRates: Record<string, number> = {
      cairo: 50,
      giza: 50,
      alex: 65,
      delta: 75,
      upper: 95,
    };
    const govKey = (data.governorate || 'cairo').toLowerCase();
    if (govRates[govKey] !== undefined) {
      shippingFee = govRates[govKey];
    } else {
      const govDoc = await Governorate.findOne({
        $or: [
          { nameEn: new RegExp(data.governorate, 'i') },
          { nameAr: new RegExp(data.governorate, 'i') },
        ],
      });
      if (govDoc) {
        shippingFee = govDoc.shippingFee;
      }
    }

    // Free shipping threshold (10,000 EGP)
    if (subtotal >= 10000) {
      shippingFee = 0;
    }

    // Calculate promo discount
    let discountAmount = 0;
    if (data.promoCode && data.promoCode.trim()) {
      const code = data.promoCode.trim().toUpperCase();
      if (code === 'NEXUS10' || code === 'EGYPT10') {
        discountAmount = Math.round((subtotal * 10) / 100);
      } else if (code === 'VIP15') {
        discountAmount = Math.round((subtotal * 15) / 100);
      } else {
        const coupon = await Coupon.findOne({ code, isActive: true });
        if (coupon) {
          discountAmount = Math.round((subtotal * coupon.discountPercent) / 100);
          if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
          }
        }
      }
    }

    const total = Math.max(subtotal - discountAmount + shippingFee, 0);

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `NX-${randomSuffix}`;

    const order = await Order.create({
      orderNumber,
      user: data.userId || undefined,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone || data.shippingAddress.phone,
      items: data.items,
      shippingAddress: data.shippingAddress,
      governorate: data.governorate || 'cairo',
      shippingFee,
      promoCode: data.promoCode,
      discountAmount,
      subtotal,
      total,
      paymentMethod: data.paymentMethod || 'COD',
      paymentStatus: 'PENDING',
      orderStatus: 'processing',
      trackingStep: 1,
      notes: data.notes,
    });

    return order;
  }

  static async getUserOrders(userId: string) {
    return Order.find({ user: userId }).sort({ createdAt: -1 }).lean();
  }

  static async getOrderById(orderId: string, userId?: string) {
    const query: Record<string, any> = {
      $or: [{ orderNumber: orderId }],
    };

    if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
      query.$or.push({ _id: orderId });
    }

    const order = await Order.findOne(query).lean();
    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    return order;
  }

  static async getUserStats(userId: string) {
    const orders = await Order.find({ user: userId }).lean();
    const activeOrders = orders.filter((o) => o.orderStatus === 'processing' || o.orderStatus === 'shipped').length;
    const completedOrders = orders.filter((o) => o.orderStatus === 'delivered').length;
    const totalSpent = orders.reduce((acc, o) => acc + (o.orderStatus !== 'cancelled' ? o.total : 0), 0);

    return {
      activeOrders,
      completedOrders,
      totalSpent,
      totalOrders: orders.length,
    };
  }
}
