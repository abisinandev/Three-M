import SignupOTP from '@modules/user/pages/SignupOtpPage';
import { useAuthStore } from '@stores/user/UserAuthStore';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signup/verify-otp')({
  beforeLoad: () => {
    const { email, clearData, timeLeft } = useAuthStore.getState();

    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isPageRefresh = navigationEntry?.type === 'reload';
    
    const isExpired = !timeLeft || Date.now() > timeLeft;

    if (isPageRefresh || !email || isExpired) {
      clearData();
      throw redirect({
        to: '/auth/signup',
        replace: true,
      });
    }
  },
  component: SignupOTP,
});