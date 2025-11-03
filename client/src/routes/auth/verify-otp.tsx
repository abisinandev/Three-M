import OTPVerificationPage from '@modules/user/components/OtpComponet'
import { useAuthStore } from '@stores/user/useAuthStore';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/verify-otp')({
  component: OTPVerificationPage,
  beforeLoad: () => {
    const { pendingEmail } = useAuthStore.getState();
    if (!pendingEmail) {
      throw redirect({ to: "/auth/signup" });
    }
  },
});