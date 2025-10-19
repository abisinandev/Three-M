import mongoose, { model, Schema } from 'mongoose';
import { IUser } from '../../domain/interfaces/IUser';
 
const UserSchemaDefinition = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: "user" },
    password: { type: String, required: true },
    kycId: { type: String },
    walletId: { type: String },
    isVerified: { type: Boolean, default: false },
    currentPlanId: { type: String },
    subscriptionId: { type: String },
    subscriptionStatus: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
})


const UserSchema = model<IUser>('User', UserSchemaDefinition);
export default UserSchema