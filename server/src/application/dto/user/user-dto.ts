export type UserDTO = {
  id: string;
  userCode: string;
  fullName: string;
  email: string;
  phone: string | null;
  role: string;
  authProvider?: string | null;
  kycStatus?: string | null;
  walletBalance?: number;
  subscriptionPlan?: string;
  walletId?: string | null;
  kycId?: string | null;
  avatar?: string | null;
  googleId?: string | null;
  isEmailVerified?: boolean;
  isVerified?: boolean;
  isBlocked?: boolean;
  subscriptionStatus?: string;
  createdAt?: string | null;
  panNumber?: string | null;
  aadhaarNumber?: string | null;
  address?: {
    fullAddress: string;
    city: string;
    state: string;
    pinCode: string;
  };
};
