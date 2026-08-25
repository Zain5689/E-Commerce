import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../../models/User';
import { env } from '../../config/env.config';
import { AppError } from '../../common/middleware/errorHandler';

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export class AuthService {
  static generateTokens(user: IUser) {
    const payload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: env.JWT_ACCESS_EXPIRES_IN as any,
    });

    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN as any,
    });

    return { accessToken, refreshToken };
  }

  static async register(data: RegisterDto) {
    const normalizedEmail = data.email.trim().toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      throw new AppError(400, 'User with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      email: normalizedEmail,
      name: data.name.trim(),
      passwordHash,
      phone: data.phone?.trim(),
      role: 'USER',
    });

    const tokens = this.generateTokens(user);

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      },
      ...tokens,
    };
  }

  static async login(data: LoginDto) {
    const normalizedEmail = data.email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      throw new AppError(401, 'Invalid email or password');
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new AppError(401, 'Invalid email or password');
    }

    const tokens = this.generateTokens(user);

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      },
      ...tokens,
    };
  }

  static async getProfile(userId: string) {
    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    return user;
  }

  static async updateProfile(userId: string, updateData: { name?: string; phone?: string }) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, 'User not found');
    }

    if (updateData.name) user.name = updateData.name.trim();
    if (updateData.phone !== undefined) user.phone = updateData.phone.trim();

    await user.save();

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      updatedAt: user.updatedAt,
    };
  }

  static async refresh(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as any;
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new AppError(401, 'User not found');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new AppError(401, 'Invalid or expired refresh token');
    }
  }
}
