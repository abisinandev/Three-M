import { model, Schema } from "mongoose";
import type { Document } from "mongoose";
import type { IUserSchema } from "../interfaces/user.schema.interfact";
import { Role } from "@domain/enum/users/user-role.enum";
import { SubscriptionStatus } from "@domain/enum/users/subscription-status.enum";
import { SubscripionPlan } from "@domain/enum/users/subscription-plan.enum";
import { CurrencyTypes } from "@domain/enum/users/currency-enum";
import { KycStatusType } from "@domain/enum/users/kyc-status.enum";

export type UserDocument = Document & IUserSchema;

const UserSchema = new Schema<UserDocument>(
  {
    userCode: { type: String, unique: true, index: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },

    role: { type: String, enum: Object.values(Role), default: Role.USER },

    isVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },

    kycId: { type: String },
    kycStatus: {
      type: String,
      enum: KycStatusType,
      default: KycStatusType.NULL,
    },
    walletId: { type: String },
    walletBalance: { type: Number, default: 0 },
    currency: { type: String, enum: CurrencyTypes, default: CurrencyTypes.INR },

    subscriptionId: { type: String },
    subscriptionStatus: { type: String, enum: Object.values(SubscriptionStatus), default: SubscriptionStatus.INACTIVE },
    subscriptionPlan: { type: String, enum: Object.values(SubscripionPlan), default: SubscripionPlan.FREE },
    isTwoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    qrCodeUrl: { type: String },
  },
  { timestamps: true },
);

export const UserModel = model<UserDocument>("User", UserSchema);
