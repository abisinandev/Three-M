import type { CurrencyTypes } from "@domain/enum/users/currency-enum";
import type { KycStatusType } from "@domain/enum/users/kyc-status.enum";
import type { SubscripionPlan } from "@domain/enum/users/subscription-plan.enum";
import type { SubscriptionStatus } from "@domain/enum/users/subscription-status.enum";
import type { UserRole } from "@domain/enum/users/user-role.enum";

export interface IUserSchema {
  _id: string;
  userCode: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;

  isVerified: boolean;
  isEmailVerified: boolean;
  isBlocked: boolean;

  kycId?: string;
  kycStatus?: KycStatusType;
  walletId?: string;
  walletBalance?: number;
  currency?: CurrencyTypes;

  subscriptionId?: string;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionPlan: SubscripionPlan;

  isTwoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  qrCodeUrl?: string;
  createdAt?: Date;
}
