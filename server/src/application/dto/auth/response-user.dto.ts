export type ResponseUserDTO = {
  userCode: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  isEmailVerified?: boolean;
  isVerified?: boolean;
  isBlocked?: boolean;
  subscriptionStatus?: string;
  createdAt: string | null;
};
