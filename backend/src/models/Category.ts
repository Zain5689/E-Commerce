import { Schema, model, Document, Types } from 'mongoose';

export interface ICategory extends Document {
  nameEn: string;
  nameAr: string;
  slug: string;
  displayOrder: number;
  parentId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    displayOrder: { type: Number, default: 0 },
    parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  },
  { timestamps: true }
);

export const Category = model<ICategory>('Category', categorySchema);
