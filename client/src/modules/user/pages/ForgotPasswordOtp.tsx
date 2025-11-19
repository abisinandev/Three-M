import { useOtpControls } from "@shared/hooks/auth/useOtpControls";
import { useAuthStore } from "@stores/user/UserAuthStore";
import OTPVerification from "@shared/components/otp/OtpComponet";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { FORGOT_PASSWORD_VERIFY, FORGOT_PASSWORD_RESEND } from "@shared/contants";
import api from "@lib/axios";
import { toast } from "sonner";

export default function ForgotPasswordOTP() {
  const { email, setData } = useAuthStore();

  const controls = useOtpControls(email as string);
  const navigate = useNavigate();

  // --- VERIFY OTP ---
  const verifyOtp = useMutation({
    mutationFn:async (otp: string) =>
      await api.post(FORGOT_PASSWORD_VERIFY, { email, otp }),

    onSuccess: (res) => {
      toast.success(res.data.message || "Otp verified. You can reset your password");
      console.log("Forgot otp verify: ",res.data)
      controls.resetOtpState();
      localStorage.removeItem(controls.storageKey);
      setData(email as string, Date.now(), res.data.data.resetToken);
      navigate({ to: "/auth/reset-password" })
    },

    onError: () => toast.error("Invalid OTP"),
  });

  // --- RESEND OTP ---
  const resendOtp = useMutation({
    mutationFn: async () => await api.post(FORGOT_PASSWORD_RESEND, { email }),

    onSuccess: () => {
      toast.success("OTP resent");
      controls.saveResendMeta();
    },

    onError: () => toast.error("Failed to resend OTP"),
  });

  return (
    <OTPVerification
      title="Reset Password Verification"
      email={email as string}
      otpValues={controls.otpValues}
      setOtpValues={controls.setOtpValues}
      timeLeft={controls.timeLeft}
      canResend={controls.canResend}
      resendCount={controls.resendCount}
      MAX_RESEND={controls.MAX_RESEND}
      isLoading={verifyOtp.isPending}
      onVerify={() => verifyOtp.mutate(controls.otpValues.join(""))}
      onResend={() => resendOtp.mutate()}
    />
  );
}
