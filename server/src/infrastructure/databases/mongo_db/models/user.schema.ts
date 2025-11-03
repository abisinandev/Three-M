import { model, Schema } from "mongoose";
import { IUserSchema } from "./interfaces/user.schema.interfact";

export interface UserDocument extends IUserSchema, Document { }

const UserSchema = new Schema<UserDocument>(
  {
    userCode: { type: String, unique: true, index: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },

    role: { type: String, enum: ["user"], default: "user" },

    isVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },

    kycId: { type: String },
    kycStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
    walletId: { type: String },
    walletBalance: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },

    subscriptionId: { type: String },
    currentPlanId: { type: String },
    subscriptionStatus: { type: String },
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String },
    loginAttempts: { type: Number, default: 0 },

    isTwoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    refreshToken: { type: String },

    deletedAt: { type: Date },
  },
  { timestamps: true },
);

export const UserModel = model<UserDocument>("User", UserSchema);
