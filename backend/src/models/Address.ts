import { Schema, model, Document, Types } from 'mongoose';

export interface IAddress extends Document {
  user: Types.ObjectId;
  title: string;
  name: string;
  phone: string;
  city: string;
  cityAr?: string;
  address: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<IAddress>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    cityAr: { type: String },
    address: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Address = model<IAddress>('Address', addressSchema);
