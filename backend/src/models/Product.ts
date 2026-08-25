import { Schema, model, Document } from 'mongoose';

export interface IProductSpecification {
  key: string;
  keyAr?: string;
  value: string;
  valueAr?: string;
}

export interface IProductFeature {
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  iconName: string;
}

export interface IProductVariantOption {
  id: string;
  name: string;
  nameAr?: string;
  priceDelta: number;
  specsDelta?: string;
  specsDeltaAr?: string;
}

export interface IProductReview {
  id: string;
  author: string;
  authorAr?: string;
  rating: number;
  date: string;
  dateAr?: string;
  comment: string;
  commentAr?: string;
  verified: boolean;
  userCity?: string;
  userCityAr?: string;
}

export interface IProduct extends Document {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  sku?: string;
  category: string;
  specs?: string;
  specsAr?: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  description?: string;
  descriptionAr?: string;
  badge?: string;
  badgeAr?: string;
  badgeColor?: 'red' | 'amber' | 'emerald' | 'blue' | 'purple';
  inStock: boolean;
  stockCount: number;
  soldCount: number;
  brand?: string;
  modelCode?: string;
  warrantyPeriod?: string;
  warrantyPeriodAr?: string;
  features: IProductFeature[];
  specifications: IProductSpecification[];
  includedInBox: { en: string; ar: string }[];
  variants: IProductVariantOption[];
  reviews: IProductReview[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    nameAr: { type: String },
    slug: { type: String, required: true, unique: true, index: true },
    sku: { type: String },
    category: { type: String, required: true, index: true },
    specs: { type: String },
    specsAr: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    rating: { type: Number, default: 5 },
    reviewsCount: { type: Number, default: 0 },
    image: { type: String, required: true },
    galleryImages: [{ type: String }],
    description: { type: String },
    descriptionAr: { type: String },
    badge: { type: String },
    badgeAr: { type: String },
    badgeColor: { type: String, enum: ['red', 'amber', 'emerald', 'blue', 'purple'], default: 'emerald' },
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 10 },
    soldCount: { type: Number, default: 0 },
    brand: { type: String, index: true },
    modelCode: { type: String },
    warrantyPeriod: { type: String },
    warrantyPeriodAr: { type: String },
    features: [
      {
        title: { type: String, required: true },
        titleAr: { type: String },
        description: { type: String, required: true },
        descriptionAr: { type: String },
        iconName: { type: String, required: true },
      },
    ],
    specifications: [
      {
        key: { type: String, required: true },
        keyAr: { type: String },
        value: { type: String, required: true },
        valueAr: { type: String },
      },
    ],
    includedInBox: [
      {
        en: { type: String, required: true },
        ar: { type: String, required: true },
      },
    ],
    variants: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        nameAr: { type: String },
        priceDelta: { type: Number, default: 0 },
        specsDelta: { type: String },
        specsDeltaAr: { type: String },
      },
    ],
    reviews: [
      {
        id: { type: String, required: true },
        author: { type: String, required: true },
        authorAr: { type: String },
        rating: { type: Number, required: true },
        date: { type: String, required: true },
        dateAr: { type: String },
        comment: { type: String, required: true },
        commentAr: { type: String },
        verified: { type: Boolean, default: true },
        userCity: { type: String },
        userCityAr: { type: String },
      },
    ],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Product = model<IProduct>('Product', productSchema);
