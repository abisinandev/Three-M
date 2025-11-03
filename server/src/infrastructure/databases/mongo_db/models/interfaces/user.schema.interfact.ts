import { Document, Types } from "mongoose";

export interface IUserSchema extends Document {
  _id: string;
  userCode: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "user";

  isVerified: boolean;
  isEmailVerified: boolean;
  isBlocked: boolean;

  kycId?: string;
  kycStatus?: "pending" | "verified" | "rejected";
  walletId?: string;
  walletBalance?: number;
  currency?: string;

  currentPlanId?: string;
  subscriptionId?: string;
  subscriptionStatus?: string;

  isTwoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  refreshToken?: string;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  loginAttempts?: number;

  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
