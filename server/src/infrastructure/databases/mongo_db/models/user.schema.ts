import { model, Schema } from "mongoose";
import { IUserSchema } from "./interfaces/user.schema.interfact";

export interface UserDocument extends IUserSchema, Document {}

const UserSchemaDefinition = new Schema<UserDocument>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: "user" },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    kycId: { type: String },
    walletId: { type: String },
    currentPlanId: { type: String },
    subscriptionId: { type: String },
    subscriptionStatus: { type: String },
  },
  { timestamps: true },
);

export const UserSchema = model<UserDocument>("User", UserSchemaDefinition);
