import mongoose, { Schema, Document } from 'mongoose';

export interface IBanner extends Document {
  title: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  tag?: string;
  tagAr?: string;
  description?: string;
  descriptionAr?: string;
  btnText?: string;
  btnTextAr?: string;
  btnLink?: string;
  image: string;
  discount?: string;
  discountAr?: string;
  badge?: string;
  badgeAr?: string;
  priceText?: string;
  priceTextAr?: string;
  bgGradient?: string;
  type: 'hero' | 'side';
  displayOrder: number;
}

export interface ITestimonial extends Document {
  customerName: string;
  customerNameAr?: string;
  comment: string;
  commentAr?: string;
  rating: number;
  date: string;
  dateAr?: string;
  verified: boolean;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    titleAr: { type: String },
    subtitle: { type: String },
    subtitleAr: { type: String },
    tag: { type: String },
    tagAr: { type: String },
    description: { type: String },
    descriptionAr: { type: String },
    btnText: { type: String },
    btnTextAr: { type: String },
    btnLink: { type: String },
    image: { type: String, required: true },
    discount: { type: String },
    discountAr: { type: String },
    badge: { type: String },
    badgeAr: { type: String },
    priceText: { type: String },
    priceTextAr: { type: String },
    bgGradient: { type: String },
    type: { type: String, enum: ['hero', 'side'], default: 'hero' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TestimonialSchema = new Schema<ITestimonial>(
  {
    customerName: { type: String, required: true },
    customerNameAr: { type: String },
    comment: { type: String, required: true },
    commentAr: { type: String },
    rating: { type: Number, default: 5 },
    date: { type: String },
    dateAr: { type: String },
    verified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Banner = mongoose.model<IBanner>('Banner', BannerSchema);
export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
