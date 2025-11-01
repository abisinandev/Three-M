import { Document } from "mongoose";

export interface IUserSchema extends Document {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  kycId?: string;
  walletId?: string;
  isVerified?: boolean;
  isEmailVerified?: boolean;
  isBlocked?: boolean;
  currentPlanId?: string;
  subscriptionId?: string;
  subscriptionStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
