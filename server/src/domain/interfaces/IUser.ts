export interface IUser {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    kycId?: string;
    walletId?: string;
    isVerified?: boolean;
    isBlocked?: boolean;
    currentPlanId?: string;
    subscriptionId?: string;
    subscriptionStatus?: string;
    createdAt?: Date;
    updatedAt?: Date;
}