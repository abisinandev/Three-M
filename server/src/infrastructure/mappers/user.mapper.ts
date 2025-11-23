import { UserEntity } from "@domain/entities/user.entity";
import { CurrencyTypes } from "@domain/enum/users/currency-enum";
import { KycStatusType } from "@domain/enum/users/kyc-status.enum";
import { SubscriptionStatus } from "@domain/enum/users/subscription-status.enum";
import type { UserDocument } from "@infrastructure/databases/mongo_db/models/schemas/user.schema";


// Convert MongoDb -> Domain
export const toDomain = (userDoc: UserDocument): UserEntity => {
  return UserEntity.reconstitute({
    id: userDoc._id.toString(),
    userCode: userDoc.userCode,
    fullName: userDoc.fullName,
    email: userDoc.email,
    phone: userDoc.phone,
    password: userDoc.password,
    role: userDoc.role,
    isEmailVerified: userDoc.isEmailVerified,
    isVerified: userDoc.isVerified,
    isBlocked: userDoc.isBlocked,
    subscriptionStatus: userDoc.subscriptionStatus ?? SubscriptionStatus.INACTIVE,
    subscriptionPlan: userDoc.subscriptionPlan,
    currency: userDoc.currency ?? CurrencyTypes.INR,
    kycId: userDoc.kycId,
    kycStatus: userDoc.kycStatus ?? KycStatusType.NULL,
    walletId: userDoc.walletId,
    walletBalance: userDoc.walletBalance ?? 0,
    isTwoFactorEnabled: userDoc.isTwoFactorEnabled ?? false,
    twoFactorSecret: userDoc.twoFactorSecret,
    qrCodeUrl: userDoc.qrCodeUrl,
    createdAt: userDoc.createdAt,
  });
};


// Convert Domain -> MongoDb
export const toPersistance = (user: UserEntity): Partial<UserDocument> => {
  return {
    // _id: user.id,
    userCode: user.userCode,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    password: user.password,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    isVerified: user.isVerified,
    isBlocked: user.isBlocked,
    subscriptionStatus: user.subscriptionStatus,
    subscriptionPlan: user.subscriptionPlan,
    currency: user.currency,
    kycId: user.kycId,
    kycStatus: user.kycStatus,
    walletId: user.walletId,
    walletBalance: user.walletBalance,
    isTwoFactorEnabled: user.isTwoFactorEnabled,
    twoFactorSecret: user.twoFactorSecret,
    qrCodeUrl: user.qrCodeUrl,
  };
};

export const UserMapper = {
  toDomain,
  toPersistance,
}