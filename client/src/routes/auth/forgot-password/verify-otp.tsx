import ForgotPasswordOTP from '@modules/user/pages/ForgotPasswordOtp'
import { useAuthStore } from '@stores/user/UserAuthStore';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/forgot-password/verify-otp')({
  beforeLoad: () => {
    const { email, clearData, timeLeft } = useAuthStore.getState();

    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isPageRefresh = navigationEntry?.type === 'reload';
    const isExpired = timeLeft && Date.now() - timeLeft > 5 * 60 * 1000;

    if (isPageRefresh || !email || isExpired) {
      clearData();
      throw redirect({
        to: '/auth/login',
        replace: true,
      });
    }
  },
  component: ForgotPasswordOTP,
})

