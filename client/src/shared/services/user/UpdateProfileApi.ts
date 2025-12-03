import api from "@lib/axiosUser";
import { SEND_EMAIL_OTP, UPDATE_PROFILE, VERIFY_EMAIL_OTP } from "@shared/constants/userContants";

export const UpdateProfileApi = async (data: {
    fullName: string;
    phone?: string;
    email?: string;
}) => {
    const response = await api.patch(UPDATE_PROFILE, data);
    return response.data;
};

export const SendEmailOtpApi = async ({ email }: { email: string }) => {
    const response = await api.post(SEND_EMAIL_OTP, { email });
    return response.data;
};

export const VerifyEmailOtpApi = async ({ email, otp }: { email: string; otp: string }) => {
    const response = await api.post(VERIFY_EMAIL_OTP, { email, otp });
    return response.data;
};