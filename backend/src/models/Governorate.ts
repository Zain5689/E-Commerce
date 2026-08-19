import { Schema, model, Document } from 'mongoose';

export interface ICity {
  nameEn: string;
  nameAr: string;
}

export interface IGovernorate extends Document {
  nameEn: string;
  nameAr: string;
  shippingFee: number;
  cities: ICity[];
  createdAt: Date;
  updatedAt: Date;
}

const governorateSchema = new Schema<IGovernorate>(
  {
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    shippingFee: { type: Number, required: true, default: 0 },
    cities: [
      {
        nameEn: { type: String, required: true },
        nameAr: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Governorate = model<IGovernorate>('Governorate', governorateSchema);
