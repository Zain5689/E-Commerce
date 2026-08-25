import { Address, IAddress } from '../../models/Address';
import { AppError } from '../../common/middleware/errorHandler';

export interface CreateAddressDto {
  userId: string;
  title: string;
  name: string;
  phone: string;
  city: string;
  cityAr?: string;
  address: string;
  isDefault?: boolean;
}

export class AddressesService {
  static async getAddresses(userId: string) {
    return Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 }).lean();
  }

  static async createAddress(data: CreateAddressDto) {
    if (data.isDefault) {
      await Address.updateMany({ user: data.userId }, { isDefault: false });
    } else {
      const count = await Address.countDocuments({ user: data.userId });
      if (count === 0) {
        data.isDefault = true;
      }
    }

    const addr = await Address.create({
      user: data.userId,
      title: data.title,
      name: data.name,
      phone: data.phone,
      city: data.city,
      cityAr: data.cityAr,
      address: data.address,
      isDefault: data.isDefault ?? false,
    });

    return addr;
  }

  static async updateAddress(addressId: string, userId: string, updateData: Partial<CreateAddressDto>) {
    const addr = await Address.findOne({ _id: addressId, user: userId });
    if (!addr) {
      throw new AppError(404, 'Address not found');
    }

    if (updateData.isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    Object.assign(addr, updateData);
    await addr.save();
    return addr;
  }

  static async deleteAddress(addressId: string, userId: string) {
    const addr = await Address.findOneAndDelete({ _id: addressId, user: userId });
    if (!addr) {
      throw new AppError(404, 'Address not found');
    }
    return { success: true, message: 'Address deleted' };
  }

  static async setDefaultAddress(addressId: string, userId: string) {
    const addr = await Address.findOne({ _id: addressId, user: userId });
    if (!addr) {
      throw new AppError(404, 'Address not found');
    }

    await Address.updateMany({ user: userId }, { isDefault: false });
    addr.isDefault = true;
    await addr.save();

    return addr;
  }
}
