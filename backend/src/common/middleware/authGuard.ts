import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.config';
import { AppError } from './errorHandler';

export type UserRole = 'USER' | 'ADMIN' | 'CUSTOMER';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : req.cookies?.accessToken;

  if (!token) {
    return next(new AppError(401, 'Unauthorized: Access token missing'));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError(401, 'Unauthorized: Invalid or expired token'));
  }
};

export const optionalAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : req.cookies?.accessToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthenticatedUser;
      req.user = decoded;
    } catch (e) {
      // Ignore token validation error in optional authenticate
    }
  }
  next();
};

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, 'Unauthorized'));
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, 'Forbidden: Insufficient permissions'));
    }
    next();
  };
};
