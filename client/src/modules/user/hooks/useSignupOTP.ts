import { useMutation } from "@tanstack/react-query";
import api from "@lib/axios";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { RESEND_OTP, VERIFY_OTP } from "@shared/contants";

export const useSignupOtp = ({ email, storageKey, resetOtpState }: any) => {
  const navigate = useNavigate();

  const verifyOtp = useMutation({
    mutationFn: async (otp: string) => {
      return await api.post(VERIFY_OTP, { email, otp });
    },
    onSuccess: (res) => {
      toast.success(res.data.message || "Email verified succcessfully");
      localStorage.removeItem(storageKey);
      resetOtpState();
      navigate({ to: "/auth/login" });
    },
    onError: () => {
      toast.error("Invalid OTP");
    },
  });

  const resendOtp = useMutation({
    mutationFn: () => api.post(RESEND_OTP, { email }),
    onSuccess: () => toast.success("OTP resent"),
    onError: () => toast.error("Failed to resend"),
  });

  return { verifyOtp, resendOtp };
};
