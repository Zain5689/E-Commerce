import { Schema, model, Document, Types } from 'mongoose';

export interface IProductSpecification {
  keyNameEn: string;
  keyNameAr?: string;
  valueEn: string;
  valueAr?: string;
}

export interface IProductVariant {
  sku: string;
  price: number;
  stockQuantity: number;
  attributes: Record<string, any>;
}

export interface IProductImage {
  url: string;
  isPrimary: boolean;
  altText?: string;
}

export interface IProduct extends Document {
  nameEn: string;
  nameAr: string;
  slug: string;
  sku: string;
  descriptionEn?: string;
  descriptionAr?: string;
  basePrice: number;
  discountPrice?: number;
  stockQuantity: number;
  condition: 'NEW' | 'OPEN_BOX' | 'REFURBISHED';
  categoryId: Types.ObjectId;
  brandId: Types.ObjectId;
  images: IProductImage[];
  specifications: IProductSpecification[];
  variants: IProductVariant[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    sku: { type: String, required: true, unique: true },
    descriptionEn: { type: String },
    descriptionAr: { type: String },
    basePrice: { type: Number, required: true },
    discountPrice: { type: Number },
    stockQuantity: { type: Number, default: 0 },
    condition: { type: String, enum: ['NEW', 'OPEN_BOX', 'REFURBISHED'], default: 'NEW' },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    brandId: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    images: [
      {
        url: { type: String, required: true },
        isPrimary: { type: Boolean, default: false },
        altText: { type: String },
      },
    ],
    specifications: [
      {
        keyNameEn: { type: String, required: true },
        keyNameAr: { type: String },
        valueEn: { type: String, required: true },
        valueAr: { type: String },
      },
    ],
    variants: [
      {
        sku: { type: String, required: true },
        price: { type: Number, required: true },
        stockQuantity: { type: Number, default: 0 },
        attributes: { type: Schema.Types.Mixed },
      },
    ],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>('Product', productSchema);
